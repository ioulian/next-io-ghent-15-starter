"use client";

import type { SvgSpriteName } from "@/components/atoms/svg-sprite/SvgSprite.generated";
import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { shallow, useSelector } from "@tanstack/react-store";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import { useHeaderContext, useTableContext } from "../DataTable.utils";

type THeadButtonProps = {} & ComponentPropsWithRef<"button">;

const SortButton: FC<THeadButtonProps> = ({ ...props }) => {
  const table = useTableContext();
  const header = useHeaderContext();
  const t = useTranslations("common.dataTable");

  // Force re-render when sorting changes
  // TODO: fix deprecation warning
  // eslint-disable-next-line sonarjs/deprecation
  useSelector(table.store, (state) => state.sorting.find((s) => s.id === header.column.id)?.desc, {
    compare: shallow,
  });

  let title: string = t("sorting.clear");
  let icon: SvgSpriteName | undefined = undefined;
  // Title
  if (header.column.getNextSortingOrder() === "asc") {
    title = t("sorting.asc");
  } else if (header.column.getNextSortingOrder() === "desc") {
    title = t("sorting.desc");
  }

  // Icon
  icon = "tablerArrowsSort";
  const isSorted = header.column.getIsSorted();
  if (isSorted !== false) {
    icon = (
      {
        asc: "tablerSortAscending",
        desc: "tablerSortDescending",
      } as const
    )[isSorted];
  }

  return (
    <button {...props} type="button" onClick={header.column.getToggleSortingHandler()} title={title}>
      <span>
        <header.FlexRender />
      </span>
      <SvgSprite name={icon} />
    </button>
  );
};

export default memo(SortButton);
