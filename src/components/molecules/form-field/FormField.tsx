"use client";

import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { formField } from "./FormField.styles";

export type FormFieldProps = {
  /**
   * Setting this option to `true` will render `<fieldset>` as a wrapper, this should be used when using multiple radio buttons or checkboxes
   */
  asFieldSet?: boolean;

  /**
   * Will hide formfield from view, usefull when using hidden input fields
   */
  isHidden?: boolean;
  disabled?: boolean;
} & ComponentPropsWithRef<"div">;

const FormField: FC<FormFieldProps> = ({ asFieldSet, isHidden, children, disabled, ...props }) => {
  const Component = asFieldSet ? "fieldset" : "div";

  return (
    // @ts-expect-error TODO: type me
    <Component {...addClassNameToProps(props, formField({ isHidden, isDisabled: disabled }))}>{children}</Component>
  );
};

export default memo(FormField);
