// oxlint-disable import/namespace
// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";
import { Env } from "@/lib/env";

const isProduction = Env.NODE_ENV === "production";

if (!Env.NEXT_PUBLIC_SENTRY_DISABLED) {
  Sentry.init({
    dsn: Env.NEXT_PUBLIC_SENTRY_DSN,

    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
      }),
      Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] }),
      Sentry.browserTracingIntegration(),

      ...(Env.NODE_ENV === "development"
        ? [Sentry.spotlightBrowserIntegration()]
        : []),
    ],

    // Adds request headers and IP for users, for more info visit
    sendDefaultPii: true,

    // Only attach trace headers to same-origin and API requests, avoiding
    // unnecessary CORS preflights to third-party domains.
    tracePropagationTargets: [/^\//, Env.NEXT_PUBLIC_API_URL],

    // Define how likely traces are sampled. Lower in production to control volume/cost.
    tracesSampleRate: isProduction ? 0.2 : 1,

    // Define how likely Replay events are sampled for normal sessions.
    replaysSessionSampleRate: isProduction ? 0.1 : 1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
