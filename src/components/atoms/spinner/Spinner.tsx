import { ComponentPropsWithRef, FC, memo, useMemo } from "react";

import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";

import { backgroundColorVar, primaryColorVar, secondaryColorVar, spinner } from "./Spinner.styles";

const Spinner: FC<
  {
    /**
     * Main color of the spinner
     */
    primaryColor?: string;

    /**
     * Secondary color of the spinner, but is by default not visible
     */
    secondaryColor?: string;

    /**
     * Background color of the spinner, usefull when using a spinner inside a component as full size
     */
    backgroundColor?: string;

    /**
     * Size of the spinner
     */
    size?: VariantProps<typeof spinner>["size"];
  } & ComponentPropsWithRef<"div">
> = ({
  children,
  style,
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  backgroundColor = "transparent",
  size,
  ...props
}) => {
  const spinnerStyle = useMemo(
    () => ({
      ...(style ?? {}),
      [backgroundColorVar]: backgroundColor,
    }),
    [backgroundColor, style],
  );
  const spinnerElementStyle = useMemo(
    () => ({
      [primaryColorVar]: primaryColor,
      [secondaryColorVar]: secondaryColor,
    }),
    [primaryColor, secondaryColor],
  );

  const classes = spinner({ size });

  return (
    <span
      role="progressbar"
      aria-busy
      aria-label={typeof children === "string" ? children : undefined}
      {...addClassNameToProps(props, classes.spinner())}
      style={spinnerStyle}
    >
      <span>
        <span className={classes.element()} style={spinnerElementStyle} />
      </span>
      {children ? <span className={classes.label()}>{children}</span> : null}
    </span>
  );
};

/**
 * Spinner component. You can provide an optional string to render beside the spinner.
 */
export default memo(Spinner);
