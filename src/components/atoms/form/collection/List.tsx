import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./List.module.css";

const List: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  return <div {...addClassNameToProps(props, styles.list)}>{children}</div>;
};

/**
 * List wrapper that will render children inline
 */
export default memo(List);
