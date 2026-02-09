"use client";

import type { FC, HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useCallback } from "react";

import { usePopoverContext } from "./Popover.hooks";

const PopoverClose: FC<HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => {
  const state = usePopoverContext();
  const onClick = useCallback(() => {
    state.setOpen(false);
  }, [state]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      onClick,
      ...props,
    });
  }

  return (
    <button onClick={onClick} {...props} type="button">
      {children}
    </button>
  );
};

export default memo(PopoverClose);
