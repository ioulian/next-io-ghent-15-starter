"use client";

import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useCallback } from "react";

import { useDialogContext } from "./hooks";

const DialogClose = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const context = useDialogContext();
    const onClick = useCallback(() => {
      context.setOpen(false);
    }, [context]);

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

DialogClose.displayName = "DialogClose";

export default memo(DialogClose);
