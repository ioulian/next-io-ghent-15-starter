import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./VisuallyHidden.module.css";

const VisuallyHidden: FC<ComponentPropsWithRef<"span">> = (props) => {
  return <span {...addClassNameToProps(props, styles.visuallyHidden)} />;
};

/**
 * Will render a component only shown to screen readers
 */
export default memo(VisuallyHidden);
