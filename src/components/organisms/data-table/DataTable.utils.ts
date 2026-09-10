/**
 * Custom table hook setup using createTableHook
 *
 * This file creates a custom useAppTable hook with pre-bound components.
 * Features, row models, and default options are defined once here and shared across all tables.
 * Context hooks and a pre-bound createAppColumnHelper are also exported.
 */

import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTableHook,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

import DateCell from "./body/DataTable.DateCell";
import NumberCell from "./body/DataTable.NumberCell";
import SelectCell from "./body/DataTable.SelectCell";
import StringCell from "./body/DataTable.StringCell";
import TBody from "./body/DataTable.TBody";
import Controls from "./controls/DataTable.Controls";
import PageSize from "./controls/DataTable.PageSize";
import Pagination from "./controls/DataTable.Pagination";
import TFoot from "./footer/DataTable.TFoot";
import ColumnFilter from "./header/DataTable.ColumnFilter";
import SortButton from "./header/DataTable.SortButton";
import THead from "./header/DataTable.THead";

export const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext } =
  createTableHook({
    features: tableFeatures({
      rowPaginationFeature,
      rowSortingFeature,
      rowSelectionFeature,
      columnFilteringFeature,
      sortedRowModel: createSortedRowModel(),
      paginatedRowModel: createPaginatedRowModel(),
      filteredRowModel: createFilteredRowModel(),
      filterFns: {
        includesString: filterFn_includesString,
      },
      sortFns: {
        alphanumeric: sortFn_alphanumeric,
        text: sortFn_text,
      },
    }),

    // set any default table options here too
    getRowId: (row) => row.id,

    // Register table-level components (accessible via table.ComponentName)
    tableComponents: {
      THead,
      TBody,
      TFoot,
      Controls,
      Pagination,
      PageSize,
    },

    // Register cell-level components (accessible via cell.ComponentName in AppCell)
    cellComponents: {
      SelectCell,
      StringCell,
      NumberCell,
      DateCell,
    },

    // Register header/footer-level components (accessible via header.ComponentName in AppHeader/AppFooter)
    headerComponents: {
      SortButton,
      ColumnFilter,
    },
  });
