"use client";

import { Header, flexRender } from "@tanstack/react-table";
import iconSort from "@tabler/icons/outline/arrows-sort.svg";
import iconSortAsc from "@tabler/icons/outline/sort-ascending.svg";
import iconSortDesc from "@tabler/icons/outline/sort-descending.svg";
import { useTranslations } from "next-intl";
import { ComponentPropsWithRef } from "react";
import clsx from "clsx";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import styles from "./DataTable.module.css";

const THeadButton = <T,>({
  header,
  ...props
}: {
  header: Header<T, unknown>;
} & ComponentPropsWithRef<"button">) => {
  const t = useTranslations("common.dataTable");

  const canSort = header.column.getCanSort();

  let title: string | undefined = undefined;
  let icon: { id: string; viewBox: string } | undefined = undefined;
  if (canSort) {
    // Title
    title = t("sorting.clear");
    if (header.column.getNextSortingOrder() === "asc") {
      title = t("sorting.asc");
    } else if (header.column.getNextSortingOrder() === "desc") {
      title = t("sorting.desc");
    }

    // Icon
    icon = iconSort;
    const isSorted = header.column.getIsSorted();
    if (isSorted !== false) {
      icon = {
        asc: iconSortAsc,
        desc: iconSortDesc,
      }[isSorted];
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
      {canSort && icon ? <SvgSprite src={icon} /> : null}
    </button>
  );
};

export default THeadButton;
