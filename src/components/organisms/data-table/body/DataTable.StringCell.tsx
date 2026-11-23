import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { useCellContext } from "../DataTable.utils";

export type Props = ComponentPropsWithRef<"span">;

function StringCell({ ...props }: Props) {
  const cell = useCellContext<string>();

  return <span {...props}>{cell.getValue()}</span>;
}

export default memo(StringCell);
