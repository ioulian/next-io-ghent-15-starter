import { tv } from "tailwind-variants";

import styles from "./Dialog.module.css";

export const overlay = tv({
  base: styles.overlay,
  variants: {
    asSheet: {
      false: styles.centerDialog,
    },
  },
});
