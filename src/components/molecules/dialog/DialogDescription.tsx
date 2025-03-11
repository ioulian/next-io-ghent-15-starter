"use client";

import { useId } from "@floating-ui/react";
import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useLayoutEffect } from "react";

import { useDialogContext } from "./hooks";

const DialogDescription = forwardRef<HTMLParagraphElement, HTMLProps<HTMLParagraphElement>>(
  ({ children, ...props }, ref) => {
    const { setDescriptionId } = useDialogContext();
    const id = useId();

    // Only sets `aria-describedby` on the Dialog root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setDescriptionId(id);
      return () => setDescriptionId(undefined);
    }, [id, setDescriptionId]);

    if (isValidElement<Record<string, unknown>>(children)) {
      return cloneElement(children, {
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

DialogDescription.displayName = "DialogDescription";

export default memo(DialogDescription);
