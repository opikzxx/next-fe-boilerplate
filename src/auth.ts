import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { authConfig } from "@/auth.config";
import { signIn as loginWithCredentials, refreshToken } from "@/features/auth/api";

async function getRefreshedToken(token: JWT): Promise<JWT> {
  try {
    const data = await refreshToken(token.refreshToken);

    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        try {
          const data = await loginWithCredentials({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            roles: data.user.roles,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Date.now() + data.expires_in * 1000,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.roles = user.roles;
        return token;
      }

      if (Date.now() < token.expiresAt) {
        return token;
      }

      return getRefreshedToken(token);
    },
  },
});
