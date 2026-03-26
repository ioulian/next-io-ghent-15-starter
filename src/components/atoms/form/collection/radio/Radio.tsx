import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import Label from "../../label/Label";

import checkboxStyles from "../checkbox/Checkbox.module.css";
import inputStyles from "./../../input/Input.module.css";
import styles from "./Radio.module.css";

const Radio: FC<{ isError?: boolean } & ComponentPropsWithRef<"input">> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  value,
  children,
  isError,
  ...props
}) => {
  const linkedId = `${name}-${value}`;

  return (
    <div className={clsx(checkboxStyles.container, styles.container)}>
      <input
        {...addClassNameToProps(props, baseInput({ isError }), inputStyles.input)}
        name={name}
        type="radio"
        id={linkedId}
        value={value}
      />
      <Label htmlFor={linkedId}>{children}</Label>
    </div>
  );
};

/**
 * Radio input field
 */
export default memo(Radio);
