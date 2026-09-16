import DOMPurify from "dompurify";

import { TRUSTED_TYPES_POLICY_NAME } from "./constants";

export { TRUSTED_TYPES_POLICY_NAME };

export type TrustedHTMLPolicy = {
  createHTML: (input: string) => string | TrustedHTML;
};

export const createTrustedHTMLPolicy = (): TrustedHTMLPolicy => {
  const createHTML = (input: string) => DOMPurify.sanitize(input);

  if (typeof window !== "undefined" && window.trustedTypes) {
    // We check on support
    // eslint-disable-next-line baseline-js/use-baseline
    return window.trustedTypes.createPolicy(TRUSTED_TYPES_POLICY_NAME, { createHTML });
  }

  return { createHTML };
};

let cachedPolicy: TrustedHTMLPolicy | undefined;

export const getTrustedHTMLPolicy = (): TrustedHTMLPolicy => {
  cachedPolicy ??= createTrustedHTMLPolicy();

  return cachedPolicy;
};
