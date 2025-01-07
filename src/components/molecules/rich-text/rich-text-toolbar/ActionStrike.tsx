"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import iconStrikethrough from "@tabler/icons/outline/strikethrough.svg";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";

const ActionStrike = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleStrike().run();
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
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={button({ isActive: editor.isActive("strike") })}
          >
            <VisuallyHidden>{t("actions.strike.text")}</VisuallyHidden>
            <SvgSprite src={iconStrikethrough} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.strike.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionStrike.displayName = "ActionStrike";

/**
 * Strikethrough action
 */
export default memo(ActionStrike);
