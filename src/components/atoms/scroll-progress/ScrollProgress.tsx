import type { ComponentPropsWithRef } from "react";

import { memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ScrollProgress.module.css";

// https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
export type Props = {
  /**
   * Main color
   */
  mainColor?: string;

  /**
   * Background color
   */
  backgroundColor?: string;
} & ComponentPropsWithRef<"div">;

function ScrollProgress({
  mainColor = "var(--color-primary-200)",
  backgroundColor = "var(--color-secondary-200)",
  style,
  ...props
}: Props) {
  const newStyle = useMemo(
    () => ({
      ...(style ?? {}),
      "--scroll-progress-main-color": mainColor,
      "--scroll-progress-background-color": backgroundColor,
    }),
    [mainColor, backgroundColor, style],
  );

  return <div {...addClassNameToProps(props, styles.scrollProgress)} style={newStyle} />;
}

/**
 * Scroll Progress bar component
 */
export default memo(ScrollProgress);
