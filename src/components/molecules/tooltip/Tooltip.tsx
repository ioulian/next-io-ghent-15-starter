"use client";

import type { FC, PropsWithChildren } from "react";

import { memo } from "react";

import type { TooltipOptions } from "./Tooltip.hooks";

import { TooltipContext, useTooltip } from "./Tooltip.hooks";

// Based on: https://floating-ui.com/docs/tooltip
const Tooltip: FC<PropsWithChildren & TooltipOptions> = ({ children, ...options }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  return <TooltipContext value={tooltip}>{children}</TooltipContext>;
};

export default memo(Tooltip);
