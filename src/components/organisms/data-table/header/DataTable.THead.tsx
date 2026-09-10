import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { useTableContext } from "../DataTable.utils";

import styles from "./DataTable.THead.module.css";

type THeadProps = { isSticky?: boolean } & ComponentPropsWithRef<"thead">;

const THead: FC<THeadProps> = ({ isSticky = false, ...props }: THeadProps) => {
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
};

export default memo(THead);
