"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./TextArea.module.css";

const TextArea: FC<{ isError?: boolean } & ComponentPropsWithRef<"textarea">> = ({
  isError,
  ...props
}) => {
  return (
    <textarea
      cols={40}
      rows={5}
      {...addClassNameToProps(props, baseInput({ isError }), styles.textarea)}
    />
  );
};

TextArea.displayName = "TextArea";

/**
 * Text component
 */
export default memo(TextArea);
