import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const Env = createEnv({
  server: {
    SENTRY_ORGANIZATION: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    AUTH_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DISABLED: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
    NEXT_PUBLIC_API_URL: z.url().default("http://localhost:3001/api/v1"),
    NEXT_PUBLIC_APP_URL: z.url().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["test", "development", "production"]).optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    SENTRY_ORGANIZATION: process.env.SENTRY_ORGANIZATION,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_SENTRY_DISABLED: process.env.NEXT_PUBLIC_SENTRY_DISABLED,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
