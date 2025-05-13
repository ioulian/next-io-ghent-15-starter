import { ComponentPropsWithRef } from "react";

import { Table } from "@tanstack/react-table";

import THeadButton from "@/components/organisms/data-table/DataTable.THeadButton";

const THead = <T,>({
  table,
  ...props
}: {
  table: Table<T>;
} & ComponentPropsWithRef<"thead">) => {
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

export default THead;
