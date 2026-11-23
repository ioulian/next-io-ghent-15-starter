import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./List.module.css";

export type Props = ComponentPropsWithRef<"div">;

function List({ children, ...props }: Props) {
  return <div {...addClassNameToProps(props, styles.list)}>{children}</div>;
}

/**
 * List wrapper that will render children inline
 */
export default memo(List);

// TODO: remove this component
