"use client";
import { AppBar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AppBarClient = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <AppBar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user ? { name: session.data.user.name ?? null } : undefined}
        ></AppBar>
    </>
  );
};
