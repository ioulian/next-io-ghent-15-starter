import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Tag.module.css";

const Tag: FC<ComponentPropsWithRef<"span">> = (props) => {
  return <span {...addClassNameToProps(props, styles.tag)} />;
};

/**
 * Tag component
 */
export default memo(Tag);
