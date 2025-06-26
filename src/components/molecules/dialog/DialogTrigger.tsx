"use client";

import { cloneElement, forwardRef, HTMLProps, isValidElement, memo } from "react";

import { useMergeRefs } from "@floating-ui/react";

import { useDialogContext } from "./hooks";

const DialogTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({ children, ...props }, propRef) => {
    const context = useDialogContext();

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
  },
);

DialogTrigger.displayName = "DialogTrigger";

export default memo(DialogTrigger);
