import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { useTableContext } from "@/components/organisms/data-table/DataTable.utils";

export type Props = ComponentPropsWithRef<"tbody">;

function TBody({ ...props }: Props) {
  const table = useTableContext();

  return (
    <tbody {...props}>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getAllCells().map((c) => (
            <table.AppCell cell={c} key={c.id}>
              {(cell) => (
                <td>
                  <cell.FlexRender />
                </td>
              )}
            </table.AppCell>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default memo(TBody);
