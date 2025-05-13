"use client";

import { ComponentPropsWithRef, forwardRef, memo, useEffect, useState } from "react";

import { FloatingDelayGroup } from "@floating-ui/react";
import { useCurrentEditor } from "@tiptap/react";

import { addClassNameToProps } from "@/utils/styles";

import ActionBold from "./ActionBold";
import ActionBulletlist from "./ActionBulletList";
import ActionFormat from "./ActionFormat";
import ActionHardBreak from "./ActionHardBreak";
import ActionHorizontalRule from "./ActionHorizontalRule";
import ActionItalic from "./ActionItalic";
import ActionOrderedList from "./ActionOrderedList";
import ActionStrike from "./ActionStrike";
import ActionSubscript from "./ActionSubscript";
import ActionSuperscript from "./ActionSuperscript";
import ActionUnderline from "./ActionUnderline";

import styles from "./RichTextToolbar.module.css";

const RichTextToolbar = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const [delay] = useState(() => ({ open: 1000, close: 200 }));

    useEffect(() => {
      if (editor) {
        editor.commands.blur();
      }
    }, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <div {...addClassNameToProps(props, styles.toolbar)} ref={ref}>
        <FloatingDelayGroup delay={delay}>
          <ActionFormat />
          <div role="separator" aria-orientation="vertical" className={styles.toolbarSeparator} />
          <ActionBold />
          <ActionItalic />
          <ActionStrike />
          <ActionUnderline />
          <ActionSubscript />
          <ActionSuperscript />
          <div role="separator" aria-orientation="vertical" className={styles.toolbarSeparator} />
          <ActionHardBreak />
          <div role="separator" aria-orientation="vertical" className={styles.toolbarSeparator} />
          <ActionBulletlist />
          <ActionOrderedList />
          <div role="separator" aria-orientation="vertical" className={styles.toolbarSeparator} />
          <ActionHorizontalRule />
        </FloatingDelayGroup>
      </div>
    );
  },
);

RichTextToolbar.displayName = "RichTextToolbar";

/**
 * Toolbar for RichTextEditor
 */
export default memo(RichTextToolbar);
