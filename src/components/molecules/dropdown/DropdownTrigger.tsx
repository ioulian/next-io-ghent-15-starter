"use client";

import type { FC } from "react";

import { cloneElement, HTMLProps, isValidElement, memo } from "react";

import { WithTypeAheadKey } from "./Dropdown";

const DropdownTrigger: FC<WithTypeAheadKey & HTMLProps<HTMLButtonElement>> = (
  // We need to remove these props as the may not be passed to the elements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { children, typeaheadKey, disabled, ...props },
) => {
  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      ...props,
    });
  }

  return (
    <button {...props} type="button">
      {children}
    </button>
  );
};

export default memo(DropdownTrigger);
