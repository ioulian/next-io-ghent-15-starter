import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import type { FieldProps } from "./Field.types";

import TextArea from "@/components/atoms/form/text-area/TextArea";
import { useBaseChangeHandler } from "@/components/organisms/form/field/Field.hooks";

import { useFieldContext } from "../Form.utils";

type InputTextAreaProps = FieldProps & ComponentPropsWithRef<"textarea">;

const InputTextArea: FC<InputTextAreaProps> = ({ ...props }) => {
  const field = useFieldContext<string>();
  const onChange = useBaseChangeHandler<string, HTMLTextAreaElement>();

  return <TextArea {...props} value={field.state.value} onChange={onChange} />;
};

export default memo(InputTextArea);
