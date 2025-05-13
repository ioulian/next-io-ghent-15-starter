"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";

import iconOrderedList from "@tabler/icons/outline/list-numbers.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionOrderedList = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().toggleOrderedList().run();
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
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            className={button({ isActive: editor.isActive("orderedList") })}
          >
            <VisuallyHidden>{t("actions.orderedList.text")}</VisuallyHidden>
            <SvgSprite src={iconOrderedList} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.orderedList.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionOrderedList.displayName = "ActionOrderedList";

/**
 * Ordered list action
 */
export default memo(ActionOrderedList);
