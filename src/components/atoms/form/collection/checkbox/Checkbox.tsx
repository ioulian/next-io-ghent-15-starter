import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import Label from "../../label/Label";
import SingleCheckbox from "../../single-checkbox/SingleCheckbox";

import styles from "./Checkbox.module.css";

export type Props = {
  isError?: boolean;
  labelProps?: ComponentPropsWithRef<typeof Label>;
} & ComponentPropsWithRef<"input">;

function Checkbox({ id, name, value, children, labelProps, ...props }: Props) {
  const linkedId = value ? `${id}-${value}` : id;

  return (
    <div className={styles.container}>
      <SingleCheckbox {...props} id={linkedId} name={name} value={value} />
      <Label htmlFor={linkedId} {...labelProps}>
        {children}
      </Label>
    </div>
  );
}

/**
 * Checkbox field
 */
export default memo(Checkbox);
