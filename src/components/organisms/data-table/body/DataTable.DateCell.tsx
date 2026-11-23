import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

export type Props = ComponentPropsWithRef<"span">;

function DateCell({ ...props }: Props) {
  const cell = useCellContext<Date>();

  return <span {...props}>{cell.getValue().toLocaleDateString()}</span>;
}

export default memo(DateCell);
