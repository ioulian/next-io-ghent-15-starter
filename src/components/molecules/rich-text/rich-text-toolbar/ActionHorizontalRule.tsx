"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback } from "react";

import iconHorizontalRule from "@tabler/icons/outline/separator-horizontal.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionHorizontalRule = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ ...props }, ref) => {
    const { editor } = useCurrentEditor();
    const t = useTranslations("common.richText.toolbar");
    const action = useCallback(() => {
      editor?.chain().focus().setHorizontalRule().run();
    }, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <Tooltip placement="top">
        <TooltipTrigger>
          <button type="button" {...props} ref={ref} onClick={action} className={button()}>
            <VisuallyHidden>{t("actions.horizontalRule.text")}</VisuallyHidden>
            <SvgSprite src={iconHorizontalRule} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("actions.horizontalRule.tooltip")}</TooltipContent>
      </Tooltip>
    );
  },
);

ActionHorizontalRule.displayName = "ActionHorizontalRule";

/**
 * Horizontal rule action
 */
export default memo(ActionHorizontalRule);
