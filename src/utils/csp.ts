import type { NextRequest } from "next/server";

import { headers } from "next/headers";

export const injectCSP = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // TODO: inline styles give nonce errors, check this, in the meantime use unsafe-inline
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return contentSecurityPolicyHeaderValue;
};

export const getNonce = async () => {
  const nonce = (await headers()).get("x-nonce");

  return nonce || undefined;
};
