import { tv } from "tailwind-variants";

import styles from "./Paragraph.module.css";

export const paragraph = tv({
  base: styles.paragraph,
  variants: {
    size: {
      lead: styles.lead,
      normal: styles.normal,
      small: styles.small,
    },
    clamped: {
      true: styles.clamped,
    },
  },
});
