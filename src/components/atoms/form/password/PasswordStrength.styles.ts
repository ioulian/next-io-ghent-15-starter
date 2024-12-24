import { tv } from "tailwind-variants";

import styles from "./PasswordStrength.module.css";

export const passwordStrength = tv({
  slots: {
    container: styles.container,
    bar: styles.bar,
    barInner: styles.barInner,
    message: styles.message,
  },
});
