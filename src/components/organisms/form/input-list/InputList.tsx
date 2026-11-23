import type { ComponentPropsWithRef, PropsWithChildren } from "react";

import { Children, cloneElement, isValidElement, memo } from "react";

import type { FieldProps } from "../field/Field.types";

import { inputList } from "@/components/organisms/form/input-list/InputList.styles";
import { addClassNameToProps } from "@/utils/styles";

export type Props = PropsWithChildren<ComponentPropsWithRef<"div"> & FieldProps>;

function InputList({ children, ...props }: Props) {
  const {
    name,
    id,
    disabled,

    // Remove unnecessary props, they should not be passed
    required: _required,
    "aria-invalid": _ariaInvalid,
    "aria-describedby": _ariaDescribedBy,
    label: _label,
    ...rest
  } = props;

  return (
    <div {...addClassNameToProps(rest, inputList({ isDisabled: disabled }))}>
      {Children.map(children, (child) => {
        if (isValidElement<FieldProps>(child)) {
          return cloneElement<FieldProps>(child, { id, name });
        }

        return null;
      })}
    </div>
  );
}

export default memo(InputList);
