import type { PolymorphicProps } from "@/types/helpers";
import type { ElementType } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { formField } from "./FormField.styles";

export type Props<E extends ElementType = "div"> = PolymorphicProps<
  E,
  {
    /**
     * Will hide formfield from view, usefull when using hidden input fields
     */
    isHidden?: boolean;
    disabled?: boolean;
  }
>;

function FormField<E extends ElementType = "div">({ as, isHidden, children, disabled, ...props }: Props<E>) {
  const Component: ElementType = as ?? "div";

  return (
    <Component {...addClassNameToProps(props, formField({ isHidden, isDisabled: disabled }))}>{children}</Component>
  );
}

export default memo(FormField) as typeof FormField;
