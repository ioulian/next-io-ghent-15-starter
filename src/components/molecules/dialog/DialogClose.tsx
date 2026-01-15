"use client";

import type { FC } from "react";

import { cloneElement, HTMLProps, isValidElement, memo, useCallback } from "react";

import { useDialogContext } from "./Dialog.hooks";

const DialogClose: FC<HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => {
  const context = useDialogContext();
  const onClick = useCallback(() => {
    context.setOpen(false);
  }, [context]);

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

export default memo(DialogClose);
