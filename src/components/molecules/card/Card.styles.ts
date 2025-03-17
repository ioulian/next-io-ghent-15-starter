import { tv } from "tailwind-variants";

import styles from "./Card.module.css";

export const card = tv({
  slots: {
    base: styles.card,
    header: styles.header,
    body: styles.body,
    footer: styles.footer,
  },
  variants: {
    padded: {
      true: {
        base: styles.padded,
      },
    },
    elevation: {
      "01": { base: [styles.elevated, styles.elevation01] },
      "02": { base: [styles.elevated, styles.elevation02] },
      "03": { base: [styles.elevated, styles.elevation03] },
    },
  },
});
