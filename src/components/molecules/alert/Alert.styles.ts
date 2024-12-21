import { tv } from "tailwind-variants";

import styles from "./Alert.module.css";

export const alert = tv({
  slots: {
    alert: styles.alert,
    icon: styles.icon,
    content: styles.content,
  },
  variants: {
    variant: {
      normal: {
        alert: styles.alertNormal,
      },
      info: {
        alert: styles.alertInfo,
      },
      danger: {
        alert: styles.alertDanger,
      },
      success: {
        alert: styles.alertSuccess,
      },
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});
