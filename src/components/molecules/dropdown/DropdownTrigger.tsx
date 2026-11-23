"use client";

import type { HTMLProps } from "react";

import { cloneElement, isValidElement, memo } from "react";

import type { WithTypeAheadKey } from "./Dropdown";

export type Props = WithTypeAheadKey & HTMLProps<HTMLButtonElement>;

function DropdownTrigger(
  // We need to remove these props as the may not be passed to the elements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { children, typeaheadKey, disabled, ...props }: Props,
) {
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
}

export default memo(DropdownTrigger);
