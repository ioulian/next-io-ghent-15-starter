import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

type NumberCellProps = {} & ComponentPropsWithRef<"span">;

const NumberCell: FC<NumberCellProps> = ({ ...props }) => {
  const cell = useCellContext<number>();

  return <span {...props}>{cell.getValue().toLocaleString()}</span>;
};

export default memo(NumberCell);
