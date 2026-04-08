import type { Table } from "@tanstack/react-table";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { memo } from "react";

import { flexRender } from "@tanstack/react-table";

type TFootProps<T> = {
  table: Table<T>;
} & ComponentPropsWithRef<"tfoot">;

const TFoot = <T,>({ table, ...props }: TFootProps<T>) => {
  return (
    <tfoot {...props}>
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th key={header.id}>
              {!header.isPlaceholder && flexRender(header.column.columnDef.footer, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

export default memo(TFoot) as <T>(props: TFootProps<T>) => ReactElement;
