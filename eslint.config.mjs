// @ts-check

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import * as moduleReplacements from "eslint-plugin-depend";
import i18next from "eslint-plugin-i18next";
import jsxA11yX from "eslint-plugin-jsx-a11y-x";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import sonarjs from "eslint-plugin-sonarjs";
import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

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
          argsIgnorePattern: "^_",
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

  // Suggest lighter alternatives for heavy dependencies
  moduleReplacements.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      moduleReplacements,
    },
  },

  // jsx-a11y-x
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: {
      "jsx-a11y-x": jsxA11yX,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]);

export default eslintConfig;
