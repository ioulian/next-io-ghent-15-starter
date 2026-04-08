"use client";

import type { Header } from "@tanstack/react-table";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { memo } from "react";

import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import styles from "./DataTable.module.css";

type THeadButtonProps<T> = {
  header: Header<T, unknown>;
} & ComponentPropsWithRef<"button">;

const THeadButton = <T,>({ header, ...props }: THeadButtonProps<T>) => {
  const t = useTranslations("common.dataTable");

  const canSort = header.column.getCanSort();

  let title: string | undefined = undefined;
  let icon: SvgSpriteName | undefined = undefined;
  if (canSort) {
    // Title
    title = t("sorting.clear");
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
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(canSort && styles.headButtonIsSortable)}
      onClick={header.column.getToggleSortingHandler()}
      title={title}
    >
      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
      {canSort && icon ? <SvgSprite name={icon} /> : null}
    </button>
  );
};

export default memo(THeadButton) as <T>(props: THeadButtonProps<T>) => ReactElement;
