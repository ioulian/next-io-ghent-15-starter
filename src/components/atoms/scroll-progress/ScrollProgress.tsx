import { ComponentPropsWithRef, forwardRef, memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ScrollProgress.module.css";

// https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
const ScrollProgress = forwardRef<
  HTMLDivElement,
  {
    /**
     * Main color
     */
    mainColor?: string;

    /**
     * Background color
     */
    backgroundColor?: string;
  } & ComponentPropsWithRef<"div">
>(
  (
    {
      mainColor = "var(--color-primary-200)",
      backgroundColor = "var(--color-secondary-200)",
      ...props
    },
    ref,
  ) => {
    const style = useMemo(
      () => ({
        "--scroll-progress-main-color": mainColor,
        "--scroll-progress-background-color": backgroundColor,
      }),
      [mainColor, backgroundColor],
    );

    return <div {...addClassNameToProps(props, styles.scrollProgress)} ref={ref} style={style} />;
  },
);

ScrollProgress.displayName = "ScrollProgress";

/**
 * Scroll Progress bar component
 */
export default memo(ScrollProgress);
