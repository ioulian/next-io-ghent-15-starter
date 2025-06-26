"use client";

import { cloneElement, forwardRef, HTMLProps, isValidElement, memo } from "react";

import { WithTypeAheadKey } from "./Dropdown";

const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  WithTypeAheadKey & HTMLProps<HTMLButtonElement>
  // We need to remove these props as the may not be passed to the elements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ children, typeaheadKey, disabled, ...props }, ref) => {
  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      ref,
      ...props,
    });
  }

  return (
    <button ref={ref} {...props} type="button">
      {children}
    </button>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

export default memo(DropdownTrigger);
