import { tv } from "tailwind-variants";

import styles from "./Button.module.css";

export const button = tv({
  slots: {
    button: styles.button,
    content: styles.content,
    spinner: styles.spinner,
    icon: styles.icon,
  },
  variants: {
    variant: {
      primary: {
        button: [styles.buttonPrimary, styles.pressAnimation],
      },
      secondary: {
        button: [styles.buttonSecondary, styles.pressAnimation],
      },
      positive: {
        button: [styles.buttonPositive, styles.pressAnimation],
      },
      negative: {
        button: [styles.buttonNegative, styles.pressAnimation],
      },
      outline: {
        button: [styles.buttonOutline, styles.pressAnimation],
      },
      ghost: {
        button: [styles.buttonGhost, styles.pressAnimation],
      },
      simple: {
        button: styles.buttonSimple,
      },
    },
    size: {
      small: { button: styles.buttonSmall, icon: styles.iconSmall },
      normal: { button: styles.buttonNormal },
      large: { button: styles.buttonLarge },
      base: { button: styles.buttonBase },
    },
    isLoading: {
      true: {
        button: styles.buttonIsLoading,
        content: styles.contentIsLoading,
        spinner: styles.spinnerIsLoading,
      },
    },
    fullWidth: {
      true: {
        button: styles.buttonFullWidth,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "normal",
    isLoading: false,
    fullWidth: false,
  },
});
