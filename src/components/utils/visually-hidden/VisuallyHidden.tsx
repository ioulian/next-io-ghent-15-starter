import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./VisuallyHidden.module.css";

export type Props = ComponentPropsWithRef<"span">;

function VisuallyHidden(props: Props) {
  return <span {...addClassNameToProps(props, styles.visuallyHidden)} />;
}

/**
 * Will render a component only shown to screen readers
 */
export default memo(VisuallyHidden);
