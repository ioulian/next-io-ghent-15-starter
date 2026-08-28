import type { LocaleType } from "./types";

export const locales = ["en-GB", "fr-BE", "nl-BE"] as const;
export const defaultLocale: LocaleType = locales[0];
