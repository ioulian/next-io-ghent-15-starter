import { tv } from "tailwind-variants";

import styles from "./Layout.module.css";

export const layout = tv({
  base: styles.layout,
  variants: {
    variant: {
      oneCol: styles.oneCol,

      twoCol: styles.twoCol,
      twoCol25x75: styles.twoCol25x75,
      twoCol75x25: styles.twoCol75x25,

      threeCol: styles.threeCol,
      threeCol25x50x25: styles.threeCol25x50x25,

      fourCol: styles.fourCol,
    },
  },
});
