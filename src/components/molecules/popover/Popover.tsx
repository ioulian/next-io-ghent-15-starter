"use client";

import { FC, memo, PropsWithChildren } from "react";

import { PopoverContext, PopoverOptions, usePopover } from "./hooks";

// Based on: https://floating-ui.com/docs/popover
const Popover: FC<PropsWithChildren & PopoverOptions> = ({
  children,
  modal = true,
  ...restOptions
}) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });

  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
};

export default memo(Popover);
