import type { Table } from "@tanstack/react-table";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { memo } from "react";

import THeadButton from "@/components/organisms/data-table/DataTable.THeadButton";

type THeadProps<T> = {
  table: Table<T>;
} & ComponentPropsWithRef<"thead">;

const THead = <T,>({ table, ...props }: THeadProps<T>) => {
  return (
    <thead {...props}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>{!header.isPlaceholder && <THeadButton<T> header={header} />}</th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default memo(THead) as <T>(props: THeadProps<T>) => ReactElement;
