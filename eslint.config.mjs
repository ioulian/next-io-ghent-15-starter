// @ts-check

import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import i18next from "eslint-plugin-i18next";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import sonarjs from "eslint-plugin-sonarjs";
import storybook from "eslint-plugin-storybook";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:storybook/recommended"),

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
  {
    files: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },

  // SonarJS
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/fixme-tag": "warn",
      "sonarjs/todo-tag": "warn",
      "sonarjs/no-unused-vars": "off",
      // As we use generic tests
      "sonarjs/no-empty-test-file": "off",
    },
  },

  reactYouMightNotNeedAnEffect.configs.recommended,

  // Storybook
  ...storybook.configs["flat/recommended"],
  {
    // Inside your .eslintignore file
    ignores: ["!.storybook"],
  },
];

export default eslintConfig;
