import { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { injectCSP } from "@/utils/csp";

import { routing } from "./i18n/routing";

export default function middleware(req: NextRequest) {
  let res = createMiddleware(routing)(req);

  if (process.env.NODE_ENV === "production") {
    // TODO: CSP is not set for 404 and 500 pages
    res = injectCSP(req, res);
  }

  return res;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|_vercel|.*\\..*).*)",
  // missing: [
  //   { type: "header", key: "next-router-prefetch" },
  //   { type: "header", key: "purpose", value: "prefetch" },
  // ],
};
