import type RichText from "@/components/molecules/rich-text/RichText";
import type { EditorEvents } from "@tiptap/react";
import type { ComponentPropsWithRef } from "react";

import { memo, useCallback } from "react";
import dynamic from "next/dynamic";

import type { FieldProps } from "./Field.types";

import { useFieldContext } from "../Form.utils";

const RichTextComponent = dynamic(() => import("@/components/molecules/rich-text/RichText"), { ssr: false });

export type Props = FieldProps & ComponentPropsWithRef<typeof RichText>;

function InputRichText({ ...props }: Props) {
  const field = useFieldContext<string>();
  const onBlur = useCallback<(props: EditorEvents["blur"]) => void>(
    (editor) => {
      field.handleChange(editor.editor.getHTML());
    },
    [field],
  );

  return <RichTextComponent {...props} content={field.state.value} onBlur={onBlur} />;
}

export default memo(InputRichText);
