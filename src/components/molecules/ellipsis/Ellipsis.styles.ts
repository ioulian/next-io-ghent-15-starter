import clsx from "clsx";
import { tv } from "tailwind-variants";

import styles from "./Ellipsis.module.css";

export const numberOfLinesVar = "--ellipsis-number-of-lines";

export const ellipsis = tv({
  slots: {
    ellipsis: styles.ellipsis,
    container: styles.container,
    content: styles.content,
    helperContent: clsx(styles.content, styles.contentHelper, styles.lineClamp),
  },
  variants: {
    isOpen: {
      false: {
        content: styles.lineClamp,
      },
    },
  },
});
