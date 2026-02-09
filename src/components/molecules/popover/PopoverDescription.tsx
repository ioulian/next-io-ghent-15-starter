"use client";

import type { FC, HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useLayoutEffect } from "react";

import { useId } from "@floating-ui/react";

import { usePopoverContext } from "./Popover.hooks";

const PopoverDescription: FC<HTMLProps<HTMLParagraphElement>> = ({ children, ...props }) => {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      id,
      ...props,
    });
  }

  return (
    <p {...props} id={id}>
      {children}
    </p>
  );
};

export default memo(PopoverDescription);
