import type { ChangeEventHandler, ComponentPropsWithRef, FC } from "react";

import { memo, useCallback, useMemo } from "react";

import type { FieldProps } from "./Field.types";

import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";

import { useFieldContext } from "../Form.utils";

type InputBooleanCheckboxProps = FieldProps & ComponentPropsWithRef<"input">;

const InputBooleanCheckbox: FC<InputBooleanCheckboxProps> = ({ label, required, ...props }) => {
  const field = useFieldContext<boolean>();

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      field.handleChange(e.target.checked);
    },
    [field],
  );

  const labelProps = useMemo(() => ({ required }), [required]);

  return (
    <Checkbox {...props} checked={field.state.value} onChange={onChange} labelProps={labelProps}>
      {label}
    </Checkbox>
  );
};

export default memo(InputBooleanCheckbox);
