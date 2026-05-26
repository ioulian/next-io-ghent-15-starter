import type { ChangeEventHandler, ComponentPropsWithRef, FC } from "react";

import { memo, useCallback, useMemo } from "react";

import type { FieldProps } from "./Field.types";

import Toggle from "@/components/atoms/form/collection/toggle/Toggle";

import { useFieldContext } from "../Form.utils";

type InputBooleanToggleProps = FieldProps & ComponentPropsWithRef<"input">;

const InputBooleanToggle: FC<InputBooleanToggleProps> = ({ label, required, ...props }) => {
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
};

export default memo(InputBooleanToggle);
