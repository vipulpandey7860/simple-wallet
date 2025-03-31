"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";
import axios from "axios";

function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return "you are not logged in";
  }
  const token = createRandomString(10);

  await prisma.onRampTransaction.create({
    data: {
      amount: Number(amount),
      provider: provider,
      token: token,
      status: "Processing",
      startTime: new Date(),
      userId: session.user.id,
    },
  });

  // ideally we should send response and user will be redirected to banking page and from there we will get webhook to our server, but for now let's send webhook to our server (assuming transactions are always successfull and user always enters their details)

  await axios.post("http://localhost:3003/hdfcWebhook", {
    token: token,
    user_identifier: session.user.id,
    amount: amount,
  });

  return {
    message: "done",
  };
}
