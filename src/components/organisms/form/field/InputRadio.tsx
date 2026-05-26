import type { ComponentPropsWithRef, FC, ReactNode } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import Radio from "@/components/atoms/form/collection/radio/Radio";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

type InputRadioProps = { label: ReactNode; value: string } & FieldProps & Omit<ComponentPropsWithRef<"input">, "value">;

const InputRadio: FC<InputRadioProps> = ({ value, label, id, ...props }) => {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLInputElement>();

  const newId = `${id}-${value}`;

  return (
    <Radio {...props} id={newId} checked={field.state.value === value} value={value} onChange={onChange}>
      {label}
    </Radio>
  );
};

export default memo(InputRadio);
