import type { ComponentPropsWithRef, FC } from "react";

import { memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Parallax.module.css";

const Parallax: FC<
  {
    /**
     * Percentage of the parallax effect
     */
    strength?: number;
  } & ComponentPropsWithRef<"div">
> = ({ strength = 0.2, style, ...props }) => {
  const newStyle = useMemo(
    () => ({
      ...(style ?? {}),
      "--parallax-offset": strength,
    }),
    [strength, style],
  );

  return <div {...addClassNameToProps(props, styles.parallax)} style={newStyle} {...props} />;
};

/**
 * Parallax component
 */
export default memo(Parallax);
