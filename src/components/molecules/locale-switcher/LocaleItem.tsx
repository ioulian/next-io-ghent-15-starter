"use client";

import type { LocaleType } from "@/i18n/types";
import type { FC } from "react";

import { memo, ViewTransition } from "react";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import { localeItem } from "./LocaleItem.styles";
import {
  LOCALE_CHANGE_TRANSITION_TYPES,
  LOCALE_INDICATOR_VIEW_TRANSITION_NAME,
  LOCALE_INDICATOR_VIEW_TRANSITION_SHARE,
} from "./LocaleSwitcher.constants";

const LocaleItem: FC<{
  /**
   * Locale to switch to
   */
  locale: LocaleType;
}> = ({ locale }) => {
  const t = useTranslations("common.localeSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

  const { link, indicator } = localeItem();

  const isActive = currentLocale === locale;
  const ariaLabel = isActive
    ? t("current", {
        locale: t(`locales.${locale}`),
      })
    : t(`locales.${locale}`);

  return (
    <Link
      href={pathname}
      locale={locale}
      lang={locale}
      hrefLang={locale}
      className={link({ isActive })}
      title={ariaLabel}
      aria-label={ariaLabel}
      transitionTypes={LOCALE_CHANGE_TRANSITION_TYPES}
    >
      {locale}
      {isActive ? (
        // The name is shared with the other locale items, so the indicator morphs from the
        // previously active locale to the new one. Only one element with this name may be mounted
        // at a time, so a page must not render more than one locale switcher.
        <ViewTransition
          name={LOCALE_INDICATOR_VIEW_TRANSITION_NAME}
          share={LOCALE_INDICATOR_VIEW_TRANSITION_SHARE}
          default="none"
        >
          <span className={indicator()} aria-hidden="true" />
        </ViewTransition>
      ) : null}
    </Link>
  );
};

export default memo(LocaleItem);
