import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonBar.module.css";

const ButtonBar = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(({ ...props }, ref) => {
  return <div {...addClassNameToProps(props, styles.buttonBar)} ref={ref} />;
});

ButtonBar.displayName = "buttonBar";

/**
 * Will render buttons as a bar
 */
export default memo(ButtonBar);
