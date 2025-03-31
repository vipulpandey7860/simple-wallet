"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

export async function P2PTransfer(amount: number, to: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return "not logged in";
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return "User not found";
  }

  // start a transaction
  await prisma.$transaction(async (tx) => {
    // lock the row until the current transaction is complete
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;
    //   check from user balance
    const fromBalance = await tx.balance.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      return "Insufficinent balance";
    }

    await tx.balance.update({
      where: { userId: session.user.id },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: { increment: amount },
      },
    });

    await tx.p2PTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        toUserId: toUser.id,
        fromUserId: session.user.id,
      },
    });
  });

  return "sent";
}
