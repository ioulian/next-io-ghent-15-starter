import { ComponentPropsWithRef, forwardRef, memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { backgroundColorVar, circularProgress, mainColorVar } from "./CircularProgress.styles";

const CircularProgress = forwardRef<
  SVGSVGElement,
  {
    /**
     * Main color
     */
    mainColor?: string;

    /**
     * Background color
     */
    backgroundColor?: string;

    /**
     * Amount to fill
     */
    percent: number;
  } & ComponentPropsWithRef<"svg">
>(
  (
    {
      mainColor = "currentColor",
      backgroundColor = "var(--color-secondary-200)",
      percent,
      ...props
    },
    ref,
  ) => {
    const classes = circularProgress();
    const style = useMemo(
      () => ({
        [mainColorVar]: mainColor,
        [backgroundColorVar]: backgroundColor,
      }),
      [mainColor, backgroundColor],
    );

    // Clamp between 0 and 1
    const finalPercent = Math.min(1, Math.max(0, percent));

    return (
      <svg {...addClassNameToProps(props, classes.circularProgress())} ref={ref} style={style}>
        <circle cx="50%" cy="50%" r="42%" className={classes.background()} fill="none" />
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          fill="none"
          strokeDasharray={`calc(2*${Math.PI}*42%*${finalPercent}) calc(2*${Math.PI}*42%)`}
          strokeLinecap={!!finalPercent ? "round" : undefined}
          className={classes.progress()}
        />
      </svg>
    );
  },
);

CircularProgress.displayName = "CircularProgress";

/**
 * Circular Progress bar component
 */
export default memo(CircularProgress);
