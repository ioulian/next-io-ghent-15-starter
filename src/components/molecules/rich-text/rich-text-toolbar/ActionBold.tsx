"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import iconBold from "@tabler/icons/outline/bold.svg";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";

const ActionBold = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleBold().run();
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
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={button({ isActive: editor.isActive("bold") })}
          >
            <VisuallyHidden>{t("actions.bold.text")}</VisuallyHidden>
            <SvgSprite src={iconBold} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.bold.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionBold.displayName = "ActionBold";

/**
 * Bold action
 */
export default memo(ActionBold);
