import { tv } from "tailwind-variants";

import styles from "./LocaleItem.module.css";

export const localeItem = tv({
  slots: {
    link: styles.localeItem,
    indicator: styles.indicator,
  },
  variants: {
    isActive: {
      true: {
        link: styles.localeItemActive,
      },
    },
  },
});
