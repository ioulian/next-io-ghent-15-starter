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
  importOrderTypeScriptVersion: "5.9.2",
  importOrder: [
    "",
    "<BUILTIN_MODULES>",
    "",
    "<TYPES>",
    "",
    "^react$",
    "^next(/.*)?$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/types(.*)$",
    "<TYPES>^[.]",
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
