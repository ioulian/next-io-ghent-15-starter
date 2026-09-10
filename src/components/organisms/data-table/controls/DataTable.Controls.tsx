"use client";

import type { FC, PropsWithChildren } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./DataTable.Controls.module.css";

const Controls: FC<PropsWithChildren> = ({ children, ...props }) => {
  // const t = useTranslations("common.dataTable");
  // const showControls = showPagination || showPerPages;

  // const pageSizeOnSelect = useCallback(
  //   (e: ChangeEvent<HTMLSelectElement>) => {
  //     table.setPageSize(Number(e.target.value));
  //   },
  //   [table],
  // );

  // const onPageChange = useCallback(
  //   (e: { selected: number }) => {
  //     table.setPageIndex(e.selected);
  //   },
  //   [table],
  // );

  // if (!showControls) {
  //   return null;
  // }

  return <div {...addClassNameToProps(props, styles.controls)}>{children}</div>;
};

export default memo(Controls);
