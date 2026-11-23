import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { useTableContext } from "../DataTable.utils";

import styles from "./DataTable.THead.module.css";

export type Props = { isSticky?: boolean } & ComponentPropsWithRef<"thead">;

function THead({ isSticky = false, ...props }: Props) {
  const table = useTableContext();

  return (
    <thead {...addClassNameToProps(props, styles.thead, isSticky && styles.sticky)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((h) => (
            <table.AppHeader header={h} key={h.id}>
              {(header) => (
                <th
                  colSpan={header.colSpan}
                  className={header.column.getCanSort() ? "sortable-header" : ""}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div>{header.column.getCanSort() ? <header.SortButton /> : <header.FlexRender />}</div>
                      {header.column.getCanFilter() ? <header.ColumnFilter /> : null}
                    </>
                  )}
                </th>
              )}
            </table.AppHeader>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default memo(THead);
