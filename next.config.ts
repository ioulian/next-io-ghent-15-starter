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

const nextConfig: NextConfig = {
  poweredByHeader: false,
  webpack: (config) => {
    injectToWebpackConfig(config);

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
