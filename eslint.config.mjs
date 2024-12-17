import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import i18next from "eslint-plugin-i18next";
// import importPlugin from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Default
  {
    rules: {
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "const",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "let",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "if",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "block",
          next: "return",
        },
      ],
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      quotes: ["error", "double", { allowTemplateLiterals: false, avoidEscape: true }],
      curly: ["error", "all"],
      "object-shorthand": "error",
      "nonblock-statement-body-position": ["error", "below"],
      "react/button-has-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/no-invalid-html-attribute": "error",
      "react/no-object-type-as-default-prop": "error",
      "react/self-closing-comp": "error",
      "react/void-dom-elements-no-children": "error",
      "react/jsx-no-target-blank": ["error", { warnOnSpreadAttributes: true }],
      "no-constant-binary-expression": "error",
    },
  },

  // i18next
  i18next.configs["flat/recommended"],

  // Import order
  //importPlugin.flatConfigs.recommended,
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },

  // SonarJS
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/todo-tag": "off",
    },
  },
];

export default eslintConfig;
