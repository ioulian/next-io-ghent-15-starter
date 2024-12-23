"use client";

import { ComponentPropsWithRef, forwardRef, memo, ReactNode } from "react";

import { addClassNameToProps } from "@/utils/styles";
import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";

import styles from "./Input.module.css";

const Input = forwardRef<
  HTMLInputElement,
  {
    /**
     * Add a node before
     */
    iconBefore?: ReactNode;

    /**
     * Add a node after
     */
    iconAfter?: ReactNode;
    isError?: boolean;
  } & ComponentPropsWithRef<"input">
>(({ iconBefore, iconAfter, isError, ...props }, ref) => {
  const element = (
    <input {...addClassNameToProps(props, baseInput({ isError }), styles.input)} ref={ref} />
  );

  if ((iconBefore || iconAfter) && !["checkbox", "radio"].includes(props.type ?? "")) {
    return (
      <div className={styles.iconContainer}>
        {iconBefore}
        {element}
        {iconAfter}
      </div>
    );
  }

  return element;
});

Input.displayName = "Input";

/**
 * Input field
 */
export default memo(Input);
