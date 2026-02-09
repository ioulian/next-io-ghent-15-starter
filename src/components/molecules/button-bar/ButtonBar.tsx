import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonBar.module.css";

const ButtonBar: FC<ComponentPropsWithRef<"div">> = ({ ...props }) => {
  return <div {...addClassNameToProps(props, styles.buttonBar)} role="group" />;
};

/**
 * Will render buttons as a bar
 */
export default memo(ButtonBar);
