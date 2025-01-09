"use client";

import { Table } from "@tanstack/react-table";
import { ComponentPropsWithRef } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./DataTable.module.css";
import THead from "./DataTable.THead";
import Controls from "./DataTable.Controls";
import TBody from "./DataTable.TBody";
import TFoot from "./DataTable.TFoot";

/**
 * Table to be used for tanstack table
 */
const DataTable = <T,>({
  table,
  showPagination = false,
  showPerPages,
  showFooter = false,
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
   * Show <tfoot>, if the table is long, this could be useful to enable
   */
  showFooter?: boolean;

  /**
   * Show selector for page size, provide an array of page sizes
   */
  showPerPages?: number[];
} & ComponentPropsWithRef<"div">) => {
  return (
    <div {...addClassNameToProps(props, styles.container)}>
      <table className={styles.table}>
        <THead<T> table={table} />
        <TBody<T> table={table} />
        {showFooter ? <TFoot<T> table={table} /> : null}
      </table>
      <Controls<T> table={table} showPagination={showPagination} showPerPages={showPerPages} />
    </div>
  );
};

export default DataTable;
