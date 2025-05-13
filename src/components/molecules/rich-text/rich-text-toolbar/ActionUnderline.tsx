"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";

import iconUnderline from "@tabler/icons/outline/underline.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionUnderline = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleUnderline().run();
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
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={button({ isActive: editor.isActive("underline") })}
          >
            <VisuallyHidden>{t("actions.underline.text")}</VisuallyHidden>
            <SvgSprite src={iconUnderline} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.underline.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionUnderline.displayName = "ActionUnderline";

/**
 * Underline action
 */
export default memo(ActionUnderline);
