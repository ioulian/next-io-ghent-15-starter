import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

// This only gives error with TSGO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { injectToWebpackConfig } from "./../scripts/svg-sprite-sheet.mjs";

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "storybook-addon-test-codegen",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },

  env: {},
  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    injectToWebpackConfig(config);

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Needs to be a copy from tsconfig.json
        "@/types": path.resolve(__dirname, "../src/@types"),
        "@/components": path.resolve(__dirname, "../src/components"),
        "@/utils": path.resolve(__dirname, "../src/utils"),
        "@/lib": path.resolve(__dirname, "../src/lib"),
        "@/hooks": path.resolve(__dirname, "../src/hooks"),
        "@/styles": path.resolve(__dirname, "../src/styles"),
        "@/services": path.resolve(__dirname, "../src/services"),
        "@": path.resolve(__dirname, "../src"),
      };
      config.resolve.plugins?.push(
        new TsconfigPathsPlugin({
          //extensions: config.resolve.extensions,
          //configFile: path.join(__dirname, "../tsconfig.json"),
        }),
      );
    }

    return config;
  },
};
export default config;
