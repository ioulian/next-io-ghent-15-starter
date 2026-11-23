import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import PasswordInput from "@/components/atoms/form/password/PasswordInput";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

export type Props = FieldProps & ComponentPropsWithRef<"input">;

function InputPassword({ ...props }: Props) {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLInputElement>();

  return <PasswordInput {...props} value={field.state.value} onChange={onChange} onBlur={field.handleBlur} />;
}

export default memo(InputPassword);
