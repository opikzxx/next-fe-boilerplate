import "./src/lib/env";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { Env } from "./src/lib/env";

const r2PublicUrl = new URL(Env.R2_PUBLIC_URL);

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: r2PublicUrl.protocol.replace(":", "") as "http" | "https",
        hostname: r2PublicUrl.hostname,
        port: r2PublicUrl.port,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.klook.com",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {
    position: "bottom-right",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: process.env.NODE_ENV === "production", // Keep the development environment fast
  logging: {
    browserToTerminal: process.env.BROWSER_TO_TERMINAL_DISABLED !== "true",
  },
};

// Initialize the Next-Intl plugin
let configWithPlugins = createNextIntlPlugin("./src/lib/i18n.ts")(baseConfig);

// Conditionally enable bundle analysis
if (process.env.ANALYZE === "true") {
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);
}

const nextConfig = configWithPlugins;
export default nextConfig;
