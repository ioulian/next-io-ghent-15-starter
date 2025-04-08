"use client";

import React, { FC, memo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { LocaleType } from "@/i18n/types";
import { Link, usePathname } from "@/i18n/navigation";

import { localeItem } from "./LocaleItem.styles";

const LocaleItem: FC<{
  /**
   * Locale to switch to
   */
  locale: LocaleType;
}> = ({ locale }) => {
  const t = useTranslations("common.localeSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

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
      className={localeItem({ isActive })}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      {locale}
    </Link>
  );
};

export default memo(LocaleItem);
