"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";

import iconSuperscript from "@tabler/icons/outline/superscript.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionSuperscript = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleSuperscript().run();
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
            disabled={!editor.can().chain().focus().toggleSuperscript().run()}
            className={button({ isActive: editor.isActive("superscript") })}
          >
            <VisuallyHidden>{t("actions.superscript.text")}</VisuallyHidden>
            <SvgSprite src={iconSuperscript} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.superscript.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionSuperscript.displayName = "ActionSuperscript";

/**
 * Superscript action
 */
export default memo(ActionSuperscript);
