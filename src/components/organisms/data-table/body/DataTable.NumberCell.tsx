import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

export type Props = ComponentPropsWithRef<"span">;

function NumberCell({ ...props }: Props) {
  const cell = useCellContext<number>();

  return <span {...props}>{cell.getValue().toLocaleString()}</span>;
}

export default memo(NumberCell);
