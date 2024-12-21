import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonGroupSeparator.module.css";

const ButtonGroupSeparator: FC<ComponentPropsWithRef<"div">> = (props) => {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      {...addClassNameToProps(props, styles.buttonGroupSeparator)}
    />
  );
};

/**
 * Will render buttons as a group
 */
export default memo(ButtonGroupSeparator);
