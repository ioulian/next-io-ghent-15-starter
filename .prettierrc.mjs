// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  printWidth: 100,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["typescript", "jsx"],
  importOrderTypeScriptVersion: "5.8.3",
  importOrder: [
    "",
    "<BUILTIN_MODULES>",
    "",
    "^react$",
    "^next(/.*)?$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
    "^@/types(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[.\/].*(?<!\.css)$",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
};

export default config;
