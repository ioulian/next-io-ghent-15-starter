"use client";

import { useId } from "@floating-ui/react";
import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useLayoutEffect } from "react";

import { usePopoverContext } from "./hooks";

const PopoverDescription = forwardRef<HTMLParagraphElement, HTMLProps<HTMLParagraphElement>>(
  ({ children, ...props }, ref) => {
    const { setDescriptionId } = usePopoverContext();
    const id = useId();

    // Only sets `aria-describedby` on the Popover root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setDescriptionId(id);
      return () => setDescriptionId(undefined);
    }, [id, setDescriptionId]);

    if (isValidElement(children)) {
      return cloneElement(children, {
        // @ts-expect-error // FIXME: types
        ref,
        id,
        ...props,
      });
    }

    return (
      <p {...props} ref={ref} id={id}>
        {children}
      </p>
    );
  },
);

PopoverDescription.displayName = "PopoverDescription";

export default memo(PopoverDescription);
