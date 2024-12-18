import { tv } from "tailwind-variants";

import styles from "./Heading.module.css";

export const heading = tv({
  base: styles.heading,
  variants: {
    size: {
      display: styles.display,
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      h6: styles.h6,
    },
  },
});
