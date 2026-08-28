/**
 * Custom table hook setup using createTableHook
 *
 * This file creates a custom useAppTable hook with pre-bound components.
 * Features, row models, and default options are defined once here and shared across all tables.
 * Context hooks and a pre-bound createAppColumnHelper are also exported.
 */

import {
  createPaginatedRowModel,
  createSortedRowModel,
  createTableHook,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

import Controls from "./DataTable.Controls";
import PageSize from "./DataTable.PageSize";
import Pagination from "./DataTable.Pagination";
import SortButton from "./DataTable.SortButton";
import TBody from "./DataTable.TBody";
import THead from "./DataTable.THead";

export const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext } =
  createTableHook({
    features: tableFeatures({
      rowPaginationFeature,
      rowSortingFeature,
      sortedRowModel: createSortedRowModel(),
      paginatedRowModel: createPaginatedRowModel(),

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
      Controls,
      Pagination,
      PageSize,
    },

    // Register cell-level components (accessible via cell.ComponentName in AppCell)
    cellComponents: {},

    // Register header/footer-level components (accessible via header.ComponentName in AppHeader/AppFooter)
    headerComponents: {
      SortButton,
    },
  });
