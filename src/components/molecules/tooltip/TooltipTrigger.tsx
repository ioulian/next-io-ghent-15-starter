"use client";

import type { FC } from "react";

import { cloneElement, HTMLProps, isValidElement, memo } from "react";

import { useMergeRefs } from "@floating-ui/react";

import { useTooltipContext } from "./hooks";

const TooltipTrigger: FC<HTMLProps<HTMLElement>> = ({ children, ref: propRef, ...props }) => {
  const context = useTooltipContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      ...context.getReferenceProps({
        ref,
        ...props,
        ...(children.props ?? {}),
      }),
      "data-state": context.open ? "open" : "closed",
    });
  }

  return (
    <span
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </span>
  );
};

export default memo(TooltipTrigger);
