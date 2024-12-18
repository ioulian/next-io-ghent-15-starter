import { tv } from "tailwind-variants";
import clsx from "clsx";

import styles from "./Spinner.module.css";

export const backgroundColorVar = "--spinner-background-color";
export const primaryColorVar = "--spinner-primary-color";
export const secondaryColorVar = "--spinner-secondary-color";

export const spinner = tv({
  slots: {
    spinner: styles.spinner,
    element: styles.element,
    label: styles.label,
  },
  variants: {
    size: {
      fullWidth: { spinner: styles.fullWidth },
      fullHeight: { spinner: styles.fullHeight },
      full: { spinner: clsx(styles.fullWidth, styles.fullHeight) },
    },
  },
});
