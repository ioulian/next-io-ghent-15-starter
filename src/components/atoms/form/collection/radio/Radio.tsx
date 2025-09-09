"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import Label from "../../label/Label";

import checkboxStyles from "../checkbox/Checkbox.module.css";
import inputStyles from "./../../input/Input.module.css";
import styles from "./Radio.module.css";

const Radio: FC<{ inputValue: string; isError?: boolean } & ComponentPropsWithRef<"input">> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  inputValue,
  children,
  isError,
  ...props
}) => {
  const linkedId = `${name}-${inputValue}`;

  return (
    <div className={clsx(checkboxStyles.container, styles.container)}>
      <input
        {...addClassNameToProps(props, baseInput({ isError }), inputStyles.input)}
        name={name}
        type="radio"
        id={linkedId}
        value={inputValue}
      />
      <Label htmlFor={linkedId}>{children}</Label>
    </div>
  );
};

/**
 * Radio input field
 */
export default memo(Radio);
