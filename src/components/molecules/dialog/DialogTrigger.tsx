"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo } from "react";

import { useMergeRefs } from "@floating-ui/react";

import { useDialogContext } from "./Dialog.hooks";

export type Props = HTMLProps<HTMLElement>;

function DialogTrigger({ children, ref: propRef, ...props }: Props) {
  const context = useDialogContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      // eslint-disable-next-line react-hooks/refs
      ...context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
      }),
      "data-state": context.open ? "open" : "closed",
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
}

export default memo(DialogTrigger);
