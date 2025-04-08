import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "@/i18n/constants";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});
