"use client";

import { useMergeRefs } from "@floating-ui/react";
import { HTMLProps, cloneElement, forwardRef, isValidElement, memo } from "react";

import { useTooltipContext } from "./hooks";

const TooltipTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({ children, ...props }, propRef) => {
    const context = useTooltipContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...(children.props ?? {}),
          // @ts-expect-error // FIXME: types
          "data-state": context.open ? "open" : "closed",
        }),
      );
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
  },
);

TooltipTrigger.displayName = "TooltipTrigger";

export default memo(TooltipTrigger);
