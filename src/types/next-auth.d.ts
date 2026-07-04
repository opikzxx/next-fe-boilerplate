import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    roles: string[];
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }

  interface Session {
    accessToken: string;
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      roles: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    roles: string[];
    error?: "RefreshAccessTokenError";
  }
}
