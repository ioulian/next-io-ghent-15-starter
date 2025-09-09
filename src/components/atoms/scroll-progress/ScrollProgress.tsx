import type { FC } from "react";

import { ComponentPropsWithRef, memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ScrollProgress.module.css";

// https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
const ScrollProgress: FC<
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
> = ({
  mainColor = "var(--color-primary-200)",
  backgroundColor = "var(--color-secondary-200)",
  ...props
}) => {
  const style = useMemo(
    () => ({
      "--scroll-progress-main-color": mainColor,
      "--scroll-progress-background-color": backgroundColor,
    }),
    [mainColor, backgroundColor],
  );

  return <div {...addClassNameToProps(props, styles.scrollProgress)} style={style} />;
};

/**
 * Scroll Progress bar component
 */
export default memo(ScrollProgress);
