import { tv } from "tailwind-variants";

import styles from "./ButtonGroup.module.css";

export const buttonGroup = tv({
  base: styles.buttonGroup,
  variants: {
    align: {
      start: styles.buttonGroupAlignStart,
      end: styles.buttonGroupAlignEnd,
    },
  },
  defaultVariants: {
    align: "start",
  },
});
