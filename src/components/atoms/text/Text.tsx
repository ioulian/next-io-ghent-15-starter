import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Text.module.css";

const Text: FC<ComponentPropsWithRef<"div">> = (props) => {
  return <div {...addClassNameToProps(props, styles.text)} />;
};

/**
 * Text component will apply styles to different components inside. Is useful when using WYSIWYG content.
 */
export default memo(Text);
