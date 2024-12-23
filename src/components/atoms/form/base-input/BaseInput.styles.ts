import { tv } from "tailwind-variants";

import styles from "./BaseInput.module.css";

export const baseInput = tv({
  base: styles.baseInput,
  variants: {
    isError: {
      true: styles.isError,
    },
  },
});
