import { tv } from "tailwind-variants";

import styles from "./RichTextToolbar.module.css";

export const button = tv({
  base: styles.button,
  variants: {
    isActive: {
      true: styles.buttonIsActive,
    },
    isDropdownTrigger: {
      true: styles.buttonIsDropdownTrigger,
    },
  },
});
