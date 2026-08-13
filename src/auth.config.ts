import type { NextAuthConfig } from "next-auth";
import { Env } from "@/lib/env";

export const authConfig = {
  secret: Env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.roles = token.roles;
      return session;
    },
  },
} satisfies NextAuthConfig;
