import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Text.module.css";

export type Props = ComponentPropsWithRef<"div">;

function Text(props: Props) {
  return <div {...addClassNameToProps(props, styles.text)} />;
}

/**
 * Text component will apply styles to different components inside. Is useful when using WYSIWYG content.
 */
export default memo(Text);
