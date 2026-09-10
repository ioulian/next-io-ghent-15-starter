"use client";

import type { FC } from "react";

import { memo, useCallback } from "react";

import CommonPagination from "@/components/molecules/pagination/Pagination";
import { useTableContext } from "@/components/organisms/data-table/DataTable.utils";

const Pagination: FC = () => {
  const table = useTableContext();

  const onPageChange = useCallback(
    (e: { selected: number }) => {
      table.setPageIndex(e.selected);
    },
    [table],
  );

  return (
    <CommonPagination
      forcePage={table.state.pagination.pageIndex}
      onPageChange={onPageChange}
      pageCount={table.getPageCount()}
    />
  );
};

export default memo(Pagination);
