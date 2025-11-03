"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useCallback } from "react";

import { useCurrentEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import Heading, { HeadingType } from "@/components/atoms/heading/Heading";
import Dropdown from "@/components/molecules/dropdown/Dropdown";
import DropdownMenuItem from "@/components/molecules/dropdown/DropdownMenuItem";
import { button } from "@/components/molecules/rich-text/rich-text-toolbar/RichTextToolbar.styles";
import { addClassNameToProps } from "@/utils/styles";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const ActionFormat: FC<ComponentPropsWithRef<"button">> = ({ ...props }) => {
  const { editor } = useCurrentEditor();
  const t = useTranslations("common.richText.toolbar");
  const actionParagraph = useCallback(() => {
    editor?.chain().focus().setParagraph().run();
  }, [editor]);

  const actionHeading = useCallback(
    (level: Level) => () => {
      editor?.chain().focus().toggleHeading({ level }).run();
    },
    [editor],
  );

  if (!editor) {
    return null;
  }

  return (
    <Dropdown
      trigger={
        <button type="button" {...addClassNameToProps(props, button({ isDropdownTrigger: true }))}>
          {t("actions.format.label")}
        </button>
      }
    >
      <DropdownMenuItem
        typeaheadKey={t("actions.format.paragraph")}
        onClick={actionParagraph}
        className={button({ isActive: editor.isActive("paragraph") })}
      >
        {t("actions.format.paragraph")}
      </DropdownMenuItem>
      {(["h1", "h2", "h3", "h4", "h5", "h6"] as HeadingType[]).map((tagName, index) => {
        const level = (index + 1) as Level;

        return (
          <DropdownMenuItem typeaheadKey={t(`actions.format.${tagName}`)} key={tagName} onClick={actionHeading(level)}>
            <button type="button" className={button({ isActive: editor.isActive("heading", { level }) })}>
              <Heading type="p" size={tagName}>
                {t(`actions.format.${tagName}`)}
              </Heading>
            </button>
          </DropdownMenuItem>
        );
      })}
    </Dropdown>
  );
};

/**
 * Format selector action
 */
export default memo(ActionFormat);
