import { tv } from "tailwind-variants";

import styles from "./LocaleItem.module.css";

export const localeItem = tv({
  base: styles.localeItem,
  variants: {
    isActive: {
      true: styles.localeItemActive,
    },
  },
});
