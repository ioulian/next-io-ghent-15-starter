"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";

import iconSubscript from "@tabler/icons/outline/subscript.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionSubscript = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleSubscript().run();
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
            disabled={!editor.can().chain().focus().toggleSubscript().run()}
            className={button({ isActive: editor.isActive("subscript") })}
          >
            <VisuallyHidden>{t("actions.subscript.text")}</VisuallyHidden>
            <SvgSprite src={iconSubscript} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.subscript.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionSubscript.displayName = "ActionSubscript";

/**
 * Subscript action
 */
export default memo(ActionSubscript);
