import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import Label from "../../label/Label";
import SingleToggle from "../../single-toggle/SingleToggle";

import styles from "./../checkbox/Checkbox.module.css";

export type Props = {
  isError?: boolean;
  labelProps?: ComponentPropsWithRef<typeof Label>;
} & ComponentPropsWithRef<"input">;

function Toggle({ id, name, value, children, labelProps, ...props }: Props) {
  const linkedId = value ? `${id}-${value}` : id;

  return (
    <div className={styles.container}>
      <SingleToggle {...props} id={linkedId} name={name} value={value} />
      <Label htmlFor={linkedId} {...labelProps}>
        {children}
      </Label>
    </div>
  );
}

/**
 * Toggle field
 */
export default memo(Toggle);
