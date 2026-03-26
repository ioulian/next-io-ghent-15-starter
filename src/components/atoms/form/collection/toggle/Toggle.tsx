"use client";

import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import Label from "../../label/Label";
import SingleToggle from "../../single-toggle/SingleToggle";

import styles from "./../checkbox/Checkbox.module.css";

const Toggle: FC<
  { isError?: boolean; labelProps?: ComponentPropsWithRef<typeof Label> } & ComponentPropsWithRef<"input">
> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  value,
  children,
  labelProps,
  ...props
}) => {
  const linkedId = `${name}-${value}`;

  return (
    <div className={styles.container}>
      <SingleToggle {...props} id={linkedId} name={name} value={value} />
      <Label htmlFor={linkedId} {...labelProps}>
        {children}
      </Label>
    </div>
  );
};

/**
 * Toggle field
 */
export default memo(Toggle);
