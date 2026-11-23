import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonBar.module.css";

export type Props = ComponentPropsWithRef<"div">;

function ButtonBar({ ...props }: Props) {
  return <div {...addClassNameToProps(props, styles.buttonBar)} role="group" />;
}

/**
 * Will render buttons as a bar
 */
export default memo(ButtonBar);
