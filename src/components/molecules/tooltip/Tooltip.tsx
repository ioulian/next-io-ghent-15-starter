"use client";

import { FC, memo, PropsWithChildren } from "react";

import { TooltipContext, TooltipOptions, useTooltip } from "./hooks";

// Based on: https://floating-ui.com/docs/tooltip
const Tooltip: FC<PropsWithChildren & TooltipOptions> = ({ children, ...options }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
};

export default memo(Tooltip);
