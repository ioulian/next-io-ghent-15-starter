"use client";

import { FloatingTree, useFloatingParentNodeId } from "@floating-ui/react";
import { createContext, forwardRef, HTMLProps, memo, ReactNode } from "react";

import DropdownMenu from "./DropdownMenu";

export const MenuContext = createContext<{
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
});

export interface WithTypeAheadKey {
  typeaheadKey?: string;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  nested?: boolean;
  children?: ReactNode;
}

const Dropdown = forwardRef<
  HTMLButtonElement,
  DropdownMenuProps & WithTypeAheadKey & HTMLProps<HTMLButtonElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <DropdownMenu {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <DropdownMenu {...props} ref={ref} />;
});

Dropdown.displayName = "Dropdown";

export default memo(Dropdown);
