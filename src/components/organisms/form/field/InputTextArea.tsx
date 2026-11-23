import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import TextArea from "@/components/atoms/form/text-area/TextArea";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

export type Props = FieldProps & ComponentPropsWithRef<"textarea">;

function InputTextArea({ ...props }: Props) {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLTextAreaElement>();

  return <TextArea {...props} value={field.state.value} onChange={onChange} onBlur={field.handleBlur} />;
}

export default memo(InputTextArea);
