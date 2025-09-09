"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useEffect, useImperativeHandle, useRef } from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import inputStyles from "./../input/Input.module.css";
import styles from "./SingleCheckbox.module.css";

const SingleCheckbox: FC<
  { isError?: boolean; indeterminate?: boolean } & Omit<ComponentPropsWithRef<"input">, "children">
> = ({ isError, indeterminate, ref, ...props }) => {
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  const isIndeterminate = !props.checked && indeterminate === true;
  useEffect(() => {
    if (innerRef?.current) {
      innerRef.current.indeterminate = isIndeterminate;
    }
  }, [innerRef, isIndeterminate]);

  return (
    <input
      {...addClassNameToProps(
        props,
        baseInput({ isError }),
        inputStyles.input,
        isIndeterminate && styles.indeterminate,
      )}
      type="checkbox"
      ref={innerRef}
    />
  );
};

/**
 * Single checkbox component, use this when the value should be a boolean (instead of an array/object).
 */
export default memo(SingleCheckbox);
