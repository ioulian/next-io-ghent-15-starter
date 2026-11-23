import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./TextArea.module.css";

export type Props = ComponentPropsWithRef<"textarea">;

function TextArea({ ...props }: Props) {
  return <textarea cols={40} rows={5} {...addClassNameToProps(props, baseInput(), styles.textarea)} />;
}

/**
 * Text component
 */
export default memo(TextArea);
