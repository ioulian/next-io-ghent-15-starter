// We can't type this easily, sue us :(
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { resolve } from "path";

import { SvgSpritePlugin } from "@jebka/webpack-svg-sprite-loader";

export const injectToWebpackConfig = (config) => {
  const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test && rule.test.test(".svg"));
  fileLoaderRule.exclude = [/\@tabler\/icons\//, /-sprite\.svg$/];
  config.module.rules.push({
    test(path) {
      return path.indexOf("@tabler/icons") !== -1 || path.indexOf("-sprite.svg") !== -1;
    },
    use: [
      {
        loader: "@jebka/webpack-svg-sprite-loader",
      },
      "svgo-loader",
    ],
    include: [
      resolve("node_modules/@tabler/icons"),
      resolve("node_modules/.pnpm/@tabler+icons"), // For .pnpm installations
      resolve("src"),
      resolve("public"),
    ],
  });
  config.plugins.push(
    new SvgSpritePlugin({
      /* The output folder must start with static, so the
       generated sprites are publicly accessible. */
      outputFolder: "static/sprites",
    }),
  );
};
