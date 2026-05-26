import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import PasswordInput from "@/components/atoms/form/password/PasswordInput";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

type InputPasswordProps = FieldProps & ComponentPropsWithRef<"input">;

const InputPassword: FC<InputPasswordProps> = ({ ...props }) => {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLInputElement>();

  return <PasswordInput {...props} value={field.state.value} onChange={onChange} />;
};

export default memo(InputPassword);
