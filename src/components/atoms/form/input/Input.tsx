"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Input.module.css";

const Input: FC<
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
> = ({ iconBefore, iconAfter, isError, ...props }) => {
  const element = <input {...addClassNameToProps(props, baseInput({ isError }), styles.input)} />;

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
};

/**
 * Input field
 */
export default memo(Input);
