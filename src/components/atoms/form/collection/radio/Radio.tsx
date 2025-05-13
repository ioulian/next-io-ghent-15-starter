"use client";

import { ComponentPropsWithRef, forwardRef, memo } from "react";

import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import Label from "../../label/Label";

import checkboxStyles from "../checkbox/Checkbox.module.css";
import inputStyles from "./../../input/Input.module.css";
import styles from "./Radio.module.css";

const Radio = forwardRef<
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
      isError,
      ...props
    },
    ref,
  ) => {
    const linkedId = `${name}-${inputValue}`;

    return (
      <div className={clsx(checkboxStyles.container, styles.container)}>
        <input
          {...addClassNameToProps(props, baseInput({ isError }), inputStyles.input)}
          name={name}
          type="radio"
          id={linkedId}
          ref={ref}
          value={inputValue}
        />
        <Label htmlFor={linkedId}>{children}</Label>
      </div>
    );
  },
);

Radio.displayName = "Radio";

/**
 * Radio input field
 */
export default memo(Radio);
