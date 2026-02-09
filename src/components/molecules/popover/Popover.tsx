"use client";

import type { FC, PropsWithChildren } from "react";

import { memo } from "react";

import type { PopoverOptions } from "./Popover.hooks";

import { PopoverContext, usePopover } from "./Popover.hooks";

// Based on: https://floating-ui.com/docs/popover
const Popover: FC<PropsWithChildren & PopoverOptions> = ({ children, modal = true, ...restOptions }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });

  return <PopoverContext value={popover}>{children}</PopoverContext>;
};

export default memo(Popover);
