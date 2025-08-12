import { useMemo } from "react";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Meta, StoryObj } from "@storybook/nextjs";

import DataTable from "./DataTable";
import { makeData, Person } from "./DataTable.data";

const StoryView = () => {
  const data = useMemo(() => makeData(10_000), []);
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
        sortDescFirst: true, // This column will sort in descending order first (default for number columns anyway)
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        // sortingFn: 'datetime' (inferred from the data)
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return <DataTable<Person> table={table} showPagination showPerPages={[10, 20, 50, 100]} />;
};

const meta: Meta<typeof DataTable> = {
  title: "UI/Organisms/Data table",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => <StoryView />,
  args: {},
};
