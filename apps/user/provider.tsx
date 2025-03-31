"use client";

import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <NextTopLoader />
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};
