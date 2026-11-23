"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useLayoutEffect } from "react";

import { useId } from "@floating-ui/react";

import { useDialogContext } from "./Dialog.hooks";

export type Props = HTMLProps<HTMLHeadingElement>;

function DialogHeading({ children, ...props }: Props) {
  const { setLabelId } = useDialogContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      id,
      ...props,
    });
  }

  return (
    <h2 {...props} id={id}>
      {children}
    </h2>
  );
}

export default memo(DialogHeading);
