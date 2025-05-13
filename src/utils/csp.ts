import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { merge } from "ts-deepmerge";

export const injectCSP = (request: NextRequest, res: NextResponse) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
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
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  const response = NextResponse.next(
    merge({}, res.clone(), {
      request: {
        headers: requestHeaders,
      },
    }),
  );
  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return response;
};

export const getNonce = async () => {
  const nonce = (await headers()).get("x-nonce");

  return nonce || undefined;
};
