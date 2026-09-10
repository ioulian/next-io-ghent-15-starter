import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

type DateCellProps = {} & ComponentPropsWithRef<"span">;

const DateCell: FC<DateCellProps> = ({ ...props }) => {
  const cell = useCellContext<Date>();

  return <span {...props}>{cell.getValue().toLocaleDateString()}</span>;
};

export default memo(DateCell);
