import { tv } from "tailwind-variants";

import styles from "./CardSlider.module.css";

export const cardSlider = tv({
  slots: {
    base: styles.cardSlider,
    body: styles.body,
    footer: styles.footer,
    slide: styles.slide,
  },
});

export const controls = tv({
  slots: {
    base: styles.controls,
    prev: styles.prev,
    pagination: styles.pagination,
    next: styles.next,
  },
});
