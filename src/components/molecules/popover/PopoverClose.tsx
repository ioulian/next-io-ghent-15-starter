"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useCallback } from "react";

import { usePopoverContext } from "./Popover.hooks";

export type Props = HTMLProps<HTMLButtonElement>;

function PopoverClose({ children, ...props }: Props) {
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
}

export default memo(PopoverClose);
