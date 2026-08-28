import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useTableContext } from "@/components/organisms/data-table/DataTable.utils";

type THeadProps = {} & ComponentPropsWithRef<"thead">;

const THead: FC<THeadProps> = ({ ...props }: THeadProps) => {
  const table = useTableContext();

  return (
    <thead {...props}>
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
                    <div>{header.column.getCanSort() ? <header.SortButton /> : <header.FlexRender />}</div>
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
