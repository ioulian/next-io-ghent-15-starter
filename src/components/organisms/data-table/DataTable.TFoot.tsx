import type { RowData, Table, TableFeatures } from "@tanstack/react-table";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { memo } from "react";

import { flexRender } from "@tanstack/react-table";

type TFootProps<TFeatures extends TableFeatures, TData extends RowData> = {
  table: Table<TFeatures, TData>;
} & ComponentPropsWithRef<"tfoot">;

const TFoot = <TFeatures extends TableFeatures, TData extends RowData>({
  table,
  ...props
}: TFootProps<TFeatures, TData>) => {
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

export default memo(TFoot) as <TFeatures extends TableFeatures, TData extends RowData>(
  props: TFootProps<TFeatures, TData>,
) => ReactElement;
