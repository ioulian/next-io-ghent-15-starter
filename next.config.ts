import crypto from "crypto";

import type { NextConfig } from "next";

import createBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

// This only gives error with TSGO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { injectToWebpackConfig } from "./scripts/svg-sprite-sheet.mjs";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Provide the path to the messages that you're using in `AppConfig`
    createMessagesDeclaration: ["./messages/en-GB/app.json", "./messages/en-GB/common.json"],
  },
});
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const customBuildId = crypto.randomBytes(16).toString("hex");

const nextConfig: NextConfig = {
  typedRoutes: true,
  poweredByHeader: false,
  // If commit hooks are enabled, you can uncomment these lines, making builds faster
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: () => customBuildId,
  env: {
    NEXT_PUBLIC_CUSTOM_BUILD_ID: customBuildId,
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          // See https://docs.arcjet.com/nosecone/quick-start?f=next-js
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Not supported/is disabled in recent browsers. Do not use! (Use CSP instead)
          // It is here as a reminder.
          // {
          //   key: "X-XSS-Protection",
          //   value: "1; mode=block",
          // },
        ],
      },
    ];
  },
  webpack: (config) => {
    injectToWebpackConfig(config);

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
