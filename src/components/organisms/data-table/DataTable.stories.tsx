import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useMemo } from "react";

import { Subscribe } from "@tanstack/react-table";

import type { Person } from "./DataTable.data";

import SingleCheckbox from "@/components/atoms/form/single-checkbox/SingleCheckbox";

import DataTable from "./DataTable";
import { makeData } from "./DataTable.data";
import { createAppColumnHelper, useAppTable } from "./DataTable.utils";

const personColumnHelper = createAppColumnHelper<Person>();

const StoryView = () => {
  const data = useMemo(() => makeData(10_000), []);
  const columns = useMemo(() => {
    return personColumnHelper.columns([
      personColumnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Subscribe source={table.atoms.rowSelection}>
            {() => (
              <SingleCheckbox
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            )}
          </Subscribe>
        ),
        cell: ({ cell }) => <cell.SelectCell />,
      }),
      personColumnHelper.accessor("firstName", {
        cell: ({ cell }) => <cell.StringCell />,
      }),
      personColumnHelper.accessor("lastName", {
        cell: ({ cell }) => <cell.StringCell />,
      }),
      personColumnHelper.accessor("age", {
        cell: ({ cell }) => <cell.NumberCell />,
        enableColumnFilter: false,
      }),
      personColumnHelper.accessor("visits", {
        enableSorting: false,
        cell: ({ cell }) => <cell.NumberCell />,
        enableColumnFilter: false,
      }),
      personColumnHelper.accessor("status", {
        cell: ({ cell }) => <cell.StringCell />,
        enableColumnFilter: false,
      }),
      personColumnHelper.accessor("progress", {
        sortDescFirst: true,
        cell: ({ cell }) => <cell.NumberCell />,
        enableColumnFilter: false,
      }),
      personColumnHelper.accessor("createdAt", {
        cell: ({ cell }) => <cell.DateCell />,
        enableColumnFilter: false,
      }),
    ]);
  }, []);

  const table = useAppTable({
    columns,
    data,
  });

  return (
    <table.AppTable>
      <DataTable>
        <table.THead isSticky />
        <table.TBody />
        <table.TFoot />
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
