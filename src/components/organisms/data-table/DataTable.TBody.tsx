import type { Table } from "@tanstack/react-table";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { memo } from "react";

import { flexRender } from "@tanstack/react-table";

type TBodyProps<T> = {
  table: Table<T>;
} & ComponentPropsWithRef<"tbody">;

const TBody = <T,>({ table, ...props }: TBodyProps<T>) => {
  return (
    <tbody {...props}>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default memo(TBody) as <T>(props: TBodyProps<T>) => ReactElement;
