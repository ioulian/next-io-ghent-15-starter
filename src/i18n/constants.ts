import { LocaleType } from "@/i18n/types";

// If changing this, also do not forget to change middleware!!
export const locales = ["en-GB", "fr-BE", "nl-BE"] as const;
export const defaultLocale: LocaleType = locales[0];
