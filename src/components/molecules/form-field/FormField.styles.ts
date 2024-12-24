import { tv } from "tailwind-variants";

import styles from "./FormField.module.css";

export const formField = tv({
  base: styles.field,
  variants: {
    isDisabled: {
      true: styles.isDisabled,
    },
    isHidden: {
      true: styles.isHidden,
    },
    isToggle: {
      true: styles.isToggle,
    },
  },
});
