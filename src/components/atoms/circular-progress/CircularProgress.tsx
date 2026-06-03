import type { ComponentPropsWithRef, FC } from "react";

import { memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { backgroundColorVar, circularProgress, mainColorVar } from "./CircularProgress.styles";

const CircularProgress: FC<
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

    /**
     * Hide the progress bar when the percent is 0, this will not show the dot that is left of the stroke
     */
    hideOnZero?: boolean;
  } & ComponentPropsWithRef<"svg">
> = ({
  mainColor = "currentColor",
  backgroundColor = "var(--color-secondary-200)",
  percent,
  hideOnZero = false,
  style,
  ...props
}) => {
  const classes = circularProgress();
  const newStyle = useMemo(
    () => ({
      ...(style ?? {}),
      [mainColorVar]: mainColor,
      [backgroundColorVar]: backgroundColor,
    }),
    [mainColor, backgroundColor, style],
  );

  // Clamp between 0 and 1
  const finalPercent = Math.min(1, Math.max(0, percent));

  return (
    <svg {...addClassNameToProps(props, classes.circularProgress())} style={newStyle}>
      <circle cx="50%" cy="50%" r="42%" className={classes.background()} fill="none" />
      {!hideOnZero || finalPercent > 0 ? (
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          fill="none"
          strokeDasharray={`calc(2*${Math.PI}*42%*${finalPercent}) calc(2*${Math.PI}*42%)`}
          strokeLinecap={finalPercent !== 1 ? "round" : undefined}
          className={classes.progress()}
        />
      ) : null}
    </svg>
  );
};

/**
 * Circular Progress bar component
 */
export default memo(CircularProgress);
