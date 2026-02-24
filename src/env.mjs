import { createEnv } from "@t3-oss/env-nextjs"; // or core package
import * as z from "zod/v4-mini";

// TODO: treeshaking does not work, this should be disabled when working on a production build
// or until https://github.com/colinhacks/zod/issues/5561 is fixed
// or only use it on server
export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SITE_URL: z.url(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_REACT_SCAN_ENABLE: z.boolean(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_REACT_SCAN_ENABLE: process.env.NEXT_PUBLIC_REACT_SCAN_ENABLE === "true",
  },
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
