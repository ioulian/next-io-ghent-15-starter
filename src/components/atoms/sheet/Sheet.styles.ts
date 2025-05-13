import clsx from "clsx";
import { tv } from "tailwind-variants";

import styles from "./Sheet.module.css";

export const sheet = tv({
  base: styles.sheet,
  variants: {
    placement: {
      top: clsx(styles.horizontal, styles.top),
      bottom: clsx(styles.horizontal, styles.bottom),
      left: clsx(styles.vertical, styles.left),
      right: clsx(styles.vertical, styles.right),
    },
  },
});
