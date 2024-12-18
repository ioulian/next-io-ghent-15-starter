import crypto from "crypto";

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();
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
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
