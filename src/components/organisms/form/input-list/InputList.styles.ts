import { tv } from "tailwind-variants";

import styles from "./InputList.module.css";

export const inputList = tv({
  base: styles.list,
  variants: {
    isDisabled: {
      true: styles.disabled,
    },
  },
});
