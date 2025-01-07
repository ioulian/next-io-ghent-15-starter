"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import iconItalic from "@tabler/icons/outline/italic.svg";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";

const ActionItalic = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
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
            ref={ref}
            onClick={action}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={button({ isActive: editor.isActive("italic") })}
          >
            <VisuallyHidden>{t("actions.italic.text")}</VisuallyHidden>
            <SvgSprite src={iconItalic} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.italic.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionItalic.displayName = "ActionItalic";

/**
 * Italic action
 */
export default memo(ActionItalic);
