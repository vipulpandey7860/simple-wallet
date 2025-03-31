import { prisma } from "@repo/db";
import { P2PTransfers } from "../../../components/P2PTransfers";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

async function getRecentTransaction() {
  const session = await getServerSession(authOptions);
  const history = await prisma.p2PTransfer.findMany({
    where: {
      OR: [{ fromUserId: session?.user.id }, { toUserId: session?.user.id }],
    },
    select: {
      amount: true,
      timestamp: true,
      fromUserId: true,
      toUserId: true,
      toUser: {
        select: {
          name: true,
        },
      },
      fromUser: {
        select: {
          name: true,
        },
      },
    },
  });

  return history.map((trans) => ({
    amount: trans.amount,
    when: trans.timestamp.toISOString(),
    type:
      trans.fromUserId === session?.user.id
        ? ("sent" as const)
        : ("received" as const),
    user: {
      name:
        (trans.fromUserId === session?.user.id
          ? trans.toUser.name
          : trans.fromUser.name) || "Unknown",
    },
  }));
}

export default async function page() {
  const p2pTranactions = await getRecentTransaction();
  return (
    <div className="w-full">
      <div className="topBar py-4 px-10 ">
        <div className="totalAvailableBalance"></div>
      </div>
      <div className="send-and-history flex items-center justify-evenly gap-12">
        <div className="send ">
          <SendCard />
        </div>
        <div className="history">
          <P2PTransfers transactions={p2pTranactions} />
        </div>
      </div>
    </div>
  );
}
