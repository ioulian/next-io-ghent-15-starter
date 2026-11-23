import type { ChangeEventHandler, ComponentPropsWithRef } from "react";

import { memo, useCallback, useMemo } from "react";

import type { FieldProps } from "./Field.types";

import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";

import { useFieldContext } from "../Form.utils";

export type Props = FieldProps & ComponentPropsWithRef<"input">;

function InputBooleanCheckbox({ label, required, ...props }: Props) {
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
}

export default memo(InputBooleanCheckbox);
