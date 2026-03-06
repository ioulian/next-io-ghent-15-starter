import type { LocaleType } from "@/i18n/types";

export const locales = ["en-GB", "fr-BE", "nl-BE"] as const;
export const defaultLocale: LocaleType = locales[0];
