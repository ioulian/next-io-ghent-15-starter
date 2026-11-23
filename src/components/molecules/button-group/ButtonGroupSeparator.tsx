import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./ButtonGroupSeparator.module.css";

export type Props = ComponentPropsWithRef<"div">;

function ButtonGroupSeparator(props: Props) {
  return (
    <div role="separator" aria-orientation="vertical" {...addClassNameToProps(props, styles.buttonGroupSeparator)} />
  );
}

/**
 * Will render buttons as a group
 */
export default memo(ButtonGroupSeparator);
