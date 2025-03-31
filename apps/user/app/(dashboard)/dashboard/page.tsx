import { prisma } from "@repo/db";
import { Card } from "@repo/ui/Card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../../lib/auth";

async function getUserBalance() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return "user not logged in";
  }
  const balance = await prisma.balance.findFirst({
    where: {
      userId: session.user.id,
    },
    select: {
      amount: true,
    },
  });
  return balance?.amount;
}
export default async function page() {
  const balance = getUserBalance();
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Wallet Balance Section */}
        <Card title="">
          <h2 className="text-lg font-semibold text-gray-700">
            Wallet Balance
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{balance} INR</p>
          <div className="flex gap-3 mt-4">
            <Link href="/p2p">➡ Send Money</Link>
            <Link href="/transfer">+ Add Money</Link>
          </div>
        </Card>
      </div>
    </>
  );
}
