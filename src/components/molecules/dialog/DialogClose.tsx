"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useCallback } from "react";

import { useDialogContext } from "./Dialog.hooks";

export type Props = HTMLProps<HTMLButtonElement>;

function DialogClose({ children, ...props }: Props) {
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
}

export default memo(DialogClose);
