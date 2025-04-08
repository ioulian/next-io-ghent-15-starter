import crypto from "crypto";

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";

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
  generateBuildId: () => customBuildId,
  env: {
    NEXT_PUBLIC_CUSTOM_BUILD_ID: customBuildId,
  },
  webpack: (config, context) => {
    injectToWebpackConfig(config, context.buildId);

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
