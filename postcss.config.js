/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-preset-env": {
      features: {
        "cascade-layers": false,
      },
    },
    "@csstools/postcss-global-data": {
      files: ["./src/app/[locale]/_styles/media.css"],
    },
    cssnano: {},
    "postcss-nesting": {},
    "postcss-import": {},
    "postcss-custom-media": {},
  },
};

module.exports = config;
