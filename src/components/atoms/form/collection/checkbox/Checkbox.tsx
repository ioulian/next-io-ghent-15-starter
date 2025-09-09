"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import Label from "../../label/Label";
import SingleCheckbox from "../../single-checkbox/SingleCheckbox";

import styles from "./Checkbox.module.css";

const Checkbox: FC<{ inputValue: string; isError?: boolean } & ComponentPropsWithRef<"input">> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  inputValue,
  children,
  ...props
}) => {
  const linkedId = `${name}-${inputValue}`;

  return (
    <div className={styles.container}>
      <SingleCheckbox {...props} id={linkedId} name={name} value={inputValue} />
      <Label htmlFor={linkedId}>{children}</Label>
    </div>
  );
};

/**
 * Checkbox field
 */
export default memo(Checkbox);
