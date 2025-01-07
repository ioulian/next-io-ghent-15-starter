"use client";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorEvents, EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import styles from "@/components/atoms/text/Text.module.css";
import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";

import RichTextToolbar from "./rich-text-toolbar/RichTextToolbar";
import richTextStyles from "./RichText.module.css";

const RichText = forwardRef<
  HTMLDivElement,
  Omit<EditorProviderProps, "children"> & { isError?: boolean }
>(({ isError, ...props }, ref) => {
  const editorRef = useRef<Editor | null>(null);
  // TODO: maybe we should write a wrapper to be used with react-hook-form controller
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
});

RichText.displayName = "RichText";

/**
 * Rich text editor component
 */
export default memo(RichText);
