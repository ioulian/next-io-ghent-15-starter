"use client";

import { ComponentPropsWithRef, forwardRef, memo } from "react";

import Label from "../../label/Label";
import SingleCheckbox from "../../single-checkbox/SingleCheckbox";

import styles from "./Checkbox.module.css";

const Checkbox = forwardRef<
  HTMLInputElement,
  { inputValue: string; isError?: boolean } & ComponentPropsWithRef<"input">
>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id,
      name,
      inputValue,
      children,
      ...props
    },
    ref,
  ) => {
    const linkedId = `${name}-${inputValue}`;

    return (
      <div className={styles.container}>
        <SingleCheckbox {...props} id={linkedId} name={name} ref={ref} value={inputValue} />
        <Label htmlFor={linkedId}>{children}</Label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

/**
 * Checkbox field
 */
export default memo(Checkbox);
