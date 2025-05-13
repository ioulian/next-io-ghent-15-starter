"use client";

import { ChangeEvent, ComponentPropsWithRef, useCallback } from "react";

import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import Select from "@/components/atoms/form/select/Select";
import Pagination from "@/components/molecules/pagination/Pagination";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./DataTable.module.css";

const Controls = <T,>({
  table,
  showPagination = false,
  showPerPages,
  ...props
}: {
  /**
   * (Tanstack) Table to render
   */
  table: Table<T>;

  /**
   * Show pagination
   */
  showPagination?: boolean;

  /**
   * Show selector for page size, provide an array of page sizes
   */
  showPerPages?: number[];
} & ComponentPropsWithRef<"div">) => {
  const t = useTranslations("common.dataTable");
  const showControls = showPagination || showPerPages;

  const pageSizeOnSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      table.setPageSize(Number(e.target.value));
    },
    [table],
  );

  const onPageChange = useCallback(
    (e: { selected: number }) => {
      table.setPageIndex(e.selected);
    },
    [table],
  );

  if (!showControls) {
    return null;
  }

  return (
    <div {...addClassNameToProps(props, styles.controls)}>
      {showPagination ? (
        <Pagination
          forcePage={table.getState().pagination.pageIndex}
          onPageChange={onPageChange}
          pageCount={table.getPageCount()}
        />
      ) : null}
      {showPerPages ? (
        <Select value={table.getState().pagination.pageSize} onChange={pageSizeOnSelect}>
          {showPerPages.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t("pageSize.label", { pageSize: pageSize.toString() })}
            </option>
          ))}
        </Select>
      ) : null}
    </div>
  );
};

export default Controls;
