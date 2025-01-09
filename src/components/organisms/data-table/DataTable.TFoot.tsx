import { Table, flexRender } from "@tanstack/react-table";
import { ComponentPropsWithRef } from "react";

const TFoot = <T,>({
  table,
  ...props
}: {
  table: Table<T>;
} & ComponentPropsWithRef<"tfoot">) => {
  return (
    <tfoot {...props}>
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th key={header.id}>
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.footer, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

export default TFoot;
