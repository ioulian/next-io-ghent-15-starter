import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonBar.module.css";

const ButtonBar: FC<ComponentPropsWithRef<"div">> = ({ ...props }) => {
  return <div {...addClassNameToProps(props, styles.buttonBar)} />;
};

/**
 * Will render buttons as a bar
 */
export default memo(ButtonBar);
