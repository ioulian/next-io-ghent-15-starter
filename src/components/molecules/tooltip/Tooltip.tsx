"use client";

import type { PropsWithChildren } from "react";

import { memo } from "react";

import type { TooltipOptions } from "./Tooltip.hooks";

import { TooltipContext, useTooltip } from "./Tooltip.hooks";

// Based on: https://floating-ui.com/docs/tooltip
export type Props = PropsWithChildren & TooltipOptions;

function Tooltip({ children, ...options }: Props) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  return <TooltipContext value={tooltip}>{children}</TooltipContext>;
}

export default memo(Tooltip);
