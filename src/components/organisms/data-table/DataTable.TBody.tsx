import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useTableContext } from "@/components/organisms/data-table/DataTable.utils";

type TBodyProps = {} & ComponentPropsWithRef<"tbody">;

const TBody: FC<TBodyProps> = ({ ...props }: TBodyProps) => {
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
};

export default memo(TBody);
