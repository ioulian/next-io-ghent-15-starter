"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useCallback } from "react";

import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionItalic: FC<ComponentPropsWithRef<"button">> = ({ ...props }) => {
  const { editor } = useCurrentEditor();
  const t = useTranslations("common.richText.toolbar");
  const action = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Tooltip placement="top">
      <TooltipTrigger>
        <button
          type="button"
          {...props}
          onClick={action}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={button({ isActive: editor.isActive("italic") })}
        >
          <VisuallyHidden>{t("actions.italic.text")}</VisuallyHidden>
          <SvgSprite name="tablerItalic" />
        </button>
      </TooltipTrigger>
      <TooltipContent>{t("actions.italic.tooltip")}</TooltipContent>
    </Tooltip>
  );
};

/**
 * Italic action
 */
export default memo(ActionItalic);
