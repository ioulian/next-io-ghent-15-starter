"use client";

import {
  ComponentPropsWithRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import inputStyles from "./../input/Input.module.css";
import styles from "./SingleCheckbox.module.css";

const SingleCheckbox = forwardRef<
  HTMLInputElement,
  { isError?: boolean; indeterminate?: boolean } & Omit<ComponentPropsWithRef<"input">, "children">
>(({ isError, indeterminate, ...props }, ref) => {
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
});

SingleCheckbox.displayName = "SingleCheckbox";

/**
 * Single checkbox component, use this when the value should be a boolean (instead of an array/object).
 */
export default memo(SingleCheckbox);
