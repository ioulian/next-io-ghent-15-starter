import { tv } from "tailwind-variants";

import styles from "./Expandable.module.css";

export const expandable = tv({
  slots: {
    expandable: styles.expandable,
    icon: styles.icon,
    container: styles.container,
    summary: styles.summary,
  },
  variants: {
    isOpen: {
      true: {
        icon: styles.iconOpen,
      },
    },
  },
});
