import { tv } from "tailwind-variants";

import styles from "./Dialog.module.css";

export const overlay = tv({
  base: styles.overlay,
  variants: {
    rendering: {
      centerDialog: styles.centerDialog,
      hidden: styles.overlayHidden,
    },
  },
});
