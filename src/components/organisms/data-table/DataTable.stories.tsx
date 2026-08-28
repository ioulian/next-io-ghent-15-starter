import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useMemo } from "react";

import type { Person } from "./DataTable.data";

import { createAppColumnHelper, useAppTable } from "@/components/organisms/data-table/DataTable.utils";

import DataTable from "./DataTable";
import { makeData } from "./DataTable.data";

const personColumnHelper = createAppColumnHelper<Person>();

const StoryView = () => {
  const data = useMemo(() => makeData(10_000), []);
  const columns = useMemo(() => {
    return personColumnHelper.columns([
      personColumnHelper.display({
        id: "rowNumber",
        header: "#",
        cell: ({ row }) => row.getDisplayIndex() + 1,
      }),
      personColumnHelper.accessor("firstName", {}),
      personColumnHelper.accessor("lastName", {}),
      personColumnHelper.accessor("age", {}),
      personColumnHelper.accessor("visits", {
        enableSorting: false,
      }),
      personColumnHelper.accessor("status", {}),
      personColumnHelper.accessor("progress", {
        sortDescFirst: true,
      }),
      personColumnHelper.accessor("createdAt", {}),
    ]);
  }, []);

  const table = useAppTable({
    columns,
    data,
  });

  return (
    <table.AppTable>
      <DataTable>
        <table.THead />
        <table.TBody />
      </DataTable>
      <table.Controls>
        <table.Pagination />
        <table.PageSize />
      </table.Controls>
    </table.AppTable>
  );
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
