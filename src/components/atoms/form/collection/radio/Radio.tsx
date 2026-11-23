import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import Label from "../../label/Label";

import checkboxStyles from "../checkbox/Checkbox.module.css";
import inputStyles from "./../../input/Input.module.css";
import styles from "./Radio.module.css";

export type Props = ComponentPropsWithRef<"input">;

function Radio({ id, name, value, children, ...props }: Props) {
  const linkedId = `${id}-${value}`;

  return (
    <div className={clsx(checkboxStyles.container, styles.container)}>
      <input
        {...addClassNameToProps(props, baseInput(), inputStyles.input)}
        name={name}
        type="radio"
        id={linkedId}
        value={value}
      />
      <Label htmlFor={linkedId}>{children}</Label>
    </div>
  );
}

/**
 * Radio input field
 */
export default memo(Radio);
