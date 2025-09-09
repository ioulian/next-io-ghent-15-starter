"use client";

import type { FC, Ref } from "react";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorEvents, EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import styles from "@/components/atoms/text/Text.module.css";

import RichTextToolbar from "./rich-text-toolbar/RichTextToolbar";

import richTextStyles from "./RichText.module.css";

const RichText: FC<
  { isError?: boolean } & Omit<EditorProviderProps, "children"> & { ref: Ref<HTMLDivElement> }
> = ({ isError, ref, ...props }) => {
  const editorRef = useRef<Editor | null>(null);
  const [extensions] = useState(() => [StarterKit, Subscript, Superscript, Underline]);
  const [editorProps] = useState(() => ({
    ref,
    attributes: {
      class: clsx(richTextStyles.richtextContent, styles.text),
    },
  }));

  const onCreate = useCallback(({ editor }: EditorEvents["create"]) => {
    editorRef.current = editor;
  }, []);

  // Only set content when not focussed (when new data is available or when form reset has been triggered)
  // Otherwise user is writing and it's already correctly reflected
  useEffect(() => {
    if (editorRef.current !== null && !editorRef.current?.isFocused) {
      editorRef.current.commands.setContent(props.content ?? "<p></p>");
    }
  }, [props.content]);

  return (
    <div className={clsx(baseInput({ isError }), richTextStyles.richtext)}>
      <EditorProvider
        {...props}
        slotBefore={<RichTextToolbar />}
        extensions={extensions}
        editorProps={editorProps}
        onCreate={onCreate}
      />
    </div>
  );
};

/**
 * Rich text editor component
 */
export default memo(RichText);
