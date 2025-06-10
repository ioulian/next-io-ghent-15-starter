import crypto from "crypto";

import createBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

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
  webpack: (config) => {
    injectToWebpackConfig(config);

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
