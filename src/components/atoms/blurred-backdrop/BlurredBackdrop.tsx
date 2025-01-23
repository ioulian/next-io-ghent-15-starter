import { ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./BlurredBackdrop.module.css";

/**
 * Better implementation of backdrop filter as discussed here: https://www.joshwcomeau.com/css/backdrop-filter/
 */
const BlurredBackdrop: FC<ComponentPropsWithRef<"div">> = (props) => {
  return <div {...addClassNameToProps(props, styles.blurredBackdrop)} />;
};

export default memo(BlurredBackdrop);
