import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./TextArea.module.css";

const TextArea: FC<{} & ComponentPropsWithRef<"textarea">> = ({ ...props }) => {
  return <textarea cols={40} rows={5} {...addClassNameToProps(props, baseInput(), styles.textarea)} />;
};

TextArea.displayName = "TextArea";

/**
 * Text component
 */
export default memo(TextArea);
