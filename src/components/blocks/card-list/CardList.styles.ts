import { tv } from "tailwind-variants";

import styles from "./CardList.module.css";

export const cardList = tv({
  slots: {
    base: styles.cardList,
    body: styles.body,
    footer: styles.footer,
  },
});
