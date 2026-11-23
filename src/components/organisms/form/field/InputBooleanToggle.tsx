import type { ChangeEventHandler, ComponentPropsWithRef } from "react";

import { memo, useCallback, useMemo } from "react";

import type { FieldProps } from "./Field.types";

import Toggle from "@/components/atoms/form/collection/toggle/Toggle";

import { useFieldContext } from "../Form.utils";

export type Props = FieldProps & ComponentPropsWithRef<"input">;

function InputBooleanToggle({ label, required, ...props }: Props) {
  const field = useFieldContext<boolean>();

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      field.handleChange(e.target.checked);
    },
    [field],
  );

  const labelProps = useMemo(() => ({ required }), [required]);

  return (
    <Toggle {...props} checked={field.state.value} onChange={onChange} labelProps={labelProps}>
      {label}
    </Toggle>
  );
}

export default memo(InputBooleanToggle);
