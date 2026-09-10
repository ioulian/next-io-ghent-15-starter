import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { Subscribe } from "@tanstack/react-table";

import SingleCheckbox from "@/components/atoms/form/single-checkbox/SingleCheckbox";

import { useCellContext, useTableContext } from "../DataTable.utils";

type SelectCellProps = {} & ComponentPropsWithRef<typeof SingleCheckbox>;

/**
 * Row-selection checkbox cell - toggles selection for the current row.
 *
 * The `Subscribe` boundary is required to work around React Compiler
 * memoization: the checkbox reads `row.getIsSelected()` (a table API call, not
 * a prop or hook the compiler can track), so without an explicit subscription
 * to the row-selection state it would never re-render when selection changes.
 */
const SelectCell: FC<SelectCellProps> = ({ ...props }) => {
  const cell = useCellContext();
  const table = useTableContext();
  const row = cell.row;

  return (
    <Subscribe source={table.atoms.rowSelection}>
      {() => (
        <SingleCheckbox
          {...props}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )}
    </Subscribe>
  );
};

export default memo(SelectCell);
