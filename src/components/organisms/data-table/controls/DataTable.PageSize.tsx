"use client";

import type { ChangeEvent, FC } from "react";

import { memo, useCallback } from "react";

import { useTranslations } from "next-intl";

import Select from "@/components/atoms/form/select/Select";
import { useTableContext } from "@/components/organisms/data-table/DataTable.utils";

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100];

const PageSize: FC<{ pageSizes?: number[] }> = ({ pageSizes = DEFAULT_PAGE_SIZES }) => {
  const t = useTranslations("common.dataTable");

  const table = useTableContext();
  const pageSizeOnSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      table.setPageSize(Number(e.target.value));
    },
    [table],
  );

  return (
    <Select value={table.state.pagination.pageSize} onChange={pageSizeOnSelect} aria-label={t("pageSize.ariaLabel")}>
      {pageSizes.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {t("pageSize.label", { pageSize: pageSize.toString() })}
        </option>
      ))}
    </Select>
  );
};

export default memo(PageSize);
