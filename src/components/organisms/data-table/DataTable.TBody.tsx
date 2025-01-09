import { Table, flexRender } from "@tanstack/react-table";
import { ComponentPropsWithRef } from "react";

const TBody = <T,>({
  table,
  ...props
}: {
  table: Table<T>;
} & ComponentPropsWithRef<"tbody">) => {
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

export default TBody;
