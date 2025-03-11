"use client";

import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useCallback } from "react";

import { usePopoverContext } from "./hooks";

const PopoverClose = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const state = usePopoverContext();
    const onClick = useCallback(() => {
      state.setOpen(false);
    }, [state]);

    if (isValidElement<Record<string, unknown>>(children)) {
      return cloneElement(children, {
        ref,
        onClick,
        ...props,
      });
    }

    return (
      <button onClick={onClick} {...props} type="button" ref={ref}>
        {children}
      </button>
    );
  },
);

PopoverClose.displayName = "PopoverClose";

export default memo(PopoverClose);
