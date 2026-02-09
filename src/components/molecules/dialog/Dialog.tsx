"use client";

import type { FC, PropsWithChildren } from "react";

import { memo } from "react";

import type { DialogOptions } from "./Dialog.hooks";

import { DialogContext, useDialog } from "./Dialog.hooks";

// Based on: https://floating-ui.com/docs/popover
const Dialog: FC<PropsWithChildren & DialogOptions> = ({ children, ...options }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = useDialog(options);

  return <DialogContext value={popover}>{children}</DialogContext>;
};

export default memo(Dialog);
