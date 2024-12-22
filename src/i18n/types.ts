import { locales } from "@/i18n/constants";

import baseCommonMessages from "../../messages/en-GB/common.json";
import baseAppMessages from "../../messages/en-GB/app.json";

export type LocaleType = (typeof locales)[number];
type Messages = typeof baseCommonMessages & typeof baseAppMessages;

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line
  interface IntlMessages extends Messages {}
}
