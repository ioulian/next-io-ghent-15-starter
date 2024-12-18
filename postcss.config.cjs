module.exports = {
  plugins: {
    "postcss-preset-env": {},
    "@csstools/postcss-global-data": {
      files: ["./src/app/[locale]/_styles/media.css"],
    },
    cssnano: {},
    "postcss-nesting": {},
    "postcss-import": {},
    "postcss-custom-media": {},
  },
};
