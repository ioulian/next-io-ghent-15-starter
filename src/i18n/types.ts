import type { locales } from "@/i18n/constants";

import type baseAppMessages from "../../messages/en-GB/app.json";
import type baseCommonMessages from "../../messages/en-GB/common.json";

export type LocaleType = (typeof locales)[number];
type Messages = typeof baseCommonMessages & typeof baseAppMessages;

declare module "next-intl" {
  interface AppConfig {
    Locale: LocaleType;
    Messages: Messages;
  }
}
