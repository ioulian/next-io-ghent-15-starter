import { tv } from "tailwind-variants";

import styles from "./CircularProgress.module.css";

export const backgroundColorVar = "--circular-progress-background-color";
export const mainColorVar = "--circular-progress-main-color";

export const circularProgress = tv({
  slots: {
    circularProgress: styles.circularProgress,
    progress: styles.progress,
    background: styles.background,
  },
});
