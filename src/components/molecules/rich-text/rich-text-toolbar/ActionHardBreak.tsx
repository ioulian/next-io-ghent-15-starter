"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useCallback } from "react";

import iconHardBreak from "@tabler/icons/outline/pilcrow.svg";
import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

const ActionHardBreak: FC<ComponentPropsWithRef<"button">> = ({ ...props }) => {
  const { editor } = useCurrentEditor();
  const t = useTranslations("common.richText.toolbar");
  const action = useCallback(() => {
    editor?.chain().focus().setHardBreak().run();
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
          disabled={!editor.can().chain().focus().setHardBreak().run()}
          className={button({ isActive: editor.isActive("setHardBreak") })}
        >
          <VisuallyHidden>{t("actions.hardBreak.text")}</VisuallyHidden>
          <SvgSprite src={iconHardBreak} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{t("actions.hardBreak.tooltip")}</TooltipContent>
    </Tooltip>
  );
};

/**
 * HardBreak action
 */
export default memo(ActionHardBreak);
