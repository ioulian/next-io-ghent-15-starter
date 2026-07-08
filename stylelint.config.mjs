/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  rules: {
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "custom-property-pattern": null,
    // As this is a boilerplate, we allow empty blocks. Remove this rule when you start using the boilerplate.
    "block-no-empty": null,
  },
};

export default config;
