import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import Input from "@/components/atoms/form/input/Input";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

type InputTextProps = FieldProps & ComponentPropsWithRef<"input">;

const InputText: FC<InputTextProps> = ({ ...props }) => {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLInputElement>();

  return <Input type="text" {...props} value={field.state.value} onChange={onChange} onBlur={field.handleBlur} />;
};

export default memo(InputText);
