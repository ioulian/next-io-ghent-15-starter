"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo, useLayoutEffect } from "react";

import { useId } from "@floating-ui/react";

import { usePopoverContext } from "./Popover.hooks";

export type Props = HTMLProps<HTMLHeadingElement>;

function PopoverHeading({ children, ...props }: Props) {
  const { setLabelId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
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

export default memo(PopoverHeading);
