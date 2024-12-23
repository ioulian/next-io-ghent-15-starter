"use client";

import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./TextArea.module.css";

const TextArea = forwardRef<
  HTMLTextAreaElement,
  { isError?: boolean } & ComponentPropsWithRef<"textarea">
>(({ isError, ...props }, ref) => {
  return (
    <textarea
      cols={40}
      rows={5}
      {...addClassNameToProps(props, baseInput({ isError }), styles.textarea)}
      ref={ref}
    />
  );
});

TextArea.displayName = "TextArea";

/**
 * Text component
 */
export default memo(TextArea);
