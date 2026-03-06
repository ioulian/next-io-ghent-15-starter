import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { injectCSP } from "@/utils/csp";

import { routing } from "./i18n/routing";

const cspEnabled = process.env.NODE_ENV === "production";

export default function middleware(req: NextRequest) {
  const contentSecurityPolicyHeaderValue = cspEnabled ? injectCSP(req) : undefined;
  const res = createMiddleware(routing)(req);

  if (cspEnabled && contentSecurityPolicyHeaderValue) {
    res.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
  }

  return res;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
