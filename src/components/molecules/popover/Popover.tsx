"use client";

import type { PropsWithChildren } from "react";

import { memo } from "react";

import type { PopoverOptions } from "./Popover.hooks";

import { PopoverContext, usePopover } from "./Popover.hooks";

// Based on: https://floating-ui.com/docs/popover
export type Props = PropsWithChildren & PopoverOptions;

function Popover({ children, modal = true, ...restOptions }: Props) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });

  return <PopoverContext value={popover}>{children}</PopoverContext>;
}

export default memo(Popover);
