import React, { FC, memo } from "react";

import { locales } from "@/i18n/constants";

import LocaleItem from "./LocaleItem";

import styles from "./LocaleSwitcher.module.css";

const LocaleSwitcher: FC = () => {
  return (
    <nav>
      <ul className={styles.list} role="list">
        {locales.map((locale) => (
          <li key={locale}>
            <LocaleItem locale={locale} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Locale switcher component. Will render buttons to switch different locales.
 */
export default memo(LocaleSwitcher);
