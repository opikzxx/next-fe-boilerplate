import * as Sentry from "@sentry/nextjs";
import { Env } from "@/lib/env";

const sentryOptions: Sentry.NodeOptions | Sentry.EdgeOptions = {
  // Sentry DSN
  dsn: Env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable Spotlight in development
  spotlight: Env.NODE_ENV === "development",

  integrations: [Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] })],

  // Adds request headers and IP for users, for more info visit
  sendDefaultPii: true,

  // Lower in production to control volume/cost, or use tracesSampler for finer control
  tracesSampleRate: Env.NODE_ENV === "production" ? 0.2 : 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

export function register() {
  if (!Env.NEXT_PUBLIC_SENTRY_DISABLED) {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      // Node.js Sentry configuration
      Sentry.init(sentryOptions);
    }

    if (process.env.NEXT_RUNTIME === "edge") {
      // Edge Sentry configuration
      Sentry.init(sentryOptions);
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
