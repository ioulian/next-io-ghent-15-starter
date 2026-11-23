import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Tag.module.css";

export type Props = ComponentPropsWithRef<"span">;

function Tag(props: Props) {
  return <span {...addClassNameToProps(props, styles.tag)} />;
}

/**
 * Tag component
 */
export default memo(Tag);
