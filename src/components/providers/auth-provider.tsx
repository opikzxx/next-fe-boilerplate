"use client";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
