import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

type StringCellProps = {} & ComponentPropsWithRef<"span">;

const StringCell: FC<StringCellProps> = ({ ...props }) => {
  const cell = useCellContext<string>();

  return <span {...props}>{cell.getValue()}</span>;
};

export default memo(StringCell);
