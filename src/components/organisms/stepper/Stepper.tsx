import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Stepper.module.css";

const Stepper: FC<ComponentPropsWithRef<"ol">> = ({ children, ...props }) => {
  return <ol {...addClassNameToProps(props, styles.stepper)}>{children}</ol>;
};

export default memo(Stepper);
