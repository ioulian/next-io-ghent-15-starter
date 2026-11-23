import type { ComponentPropsWithRef } from "react";

import { memo, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Parallax.module.css";

export type Props = {
  /**
   * Percentage of the parallax effect
   */
  strength?: number;
} & ComponentPropsWithRef<"div">;

function Parallax({ strength = 0.2, style, ...props }: Props) {
  const newStyle = useMemo(
    () => ({
      ...(style ?? {}),
      "--parallax-offset": strength,
    }),
    [strength, style],
  );

  return <div {...addClassNameToProps(props, styles.parallax)} style={newStyle} {...props} />;
}

/**
 * Parallax component
 */
export default memo(Parallax);
