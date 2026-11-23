import type { ChangeEventHandler, ComponentPropsWithRef, ReactNode } from "react";

import { memo, useCallback } from "react";

import type { FieldProps } from "./Field.types";

import Toggle from "@/components/atoms/form/collection/toggle/Toggle";

import { useFieldContext } from "../Form.utils";

export type Props = { label: ReactNode; value: string } & FieldProps & Omit<ComponentPropsWithRef<"input">, "value">;

function InputToggle({ value, label, id, ...props }: Props) {
  const field = useFieldContext<string[] | undefined>();
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      field.handleChange(
        e.target.checked
          ? [...(field.state.value ?? []), value]
          : (field.state.value?.filter((v) => v !== value) ?? []),
      );
    },
    [field, value],
  );

  const newId = `${id}-${value}`;

  return (
    <Toggle
      {...props}
      id={newId}
      checked={field.state.value?.includes(value) ?? false}
      value={value}
      onChange={onChange}
    >
      {label}
    </Toggle>
  );
}

export default memo(InputToggle);
