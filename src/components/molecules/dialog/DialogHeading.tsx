"use client";

import { useId } from "@floating-ui/react";
import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useLayoutEffect } from "react";

import { useDialogContext } from "./hooks";

const DialogHeading = forwardRef<HTMLHeadingElement, HTMLProps<HTMLHeadingElement>>(
  ({ children, ...props }, ref) => {
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
        ref,
        id,
        ...props,
      });
    }

    return (
      <h2 {...props} ref={ref} id={id}>
        {children}
      </h2>
    );
  },
);

DialogHeading.displayName = "DialogHeading";

export default memo(DialogHeading);
