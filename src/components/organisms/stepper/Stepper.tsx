import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Stepper.module.css";

export type Props = ComponentPropsWithRef<"ol">;

function Stepper({ children, ...props }: Props) {
  return <ol {...addClassNameToProps(props, styles.stepper)}>{children}</ol>;
}

export default memo(Stepper);
