"use client";

import {
  createContext,
  Dispatch,
  forwardRef,
  HTMLProps,
  memo,
  ReactNode,
  SetStateAction,
} from "react";

import { FloatingTree, useFloatingParentNodeId } from "@floating-ui/react";

import DropdownMenu from "./DropdownMenu";

export type MenuContextType = {
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  setHasFocusInside: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  allowHover: boolean;
  parent: MenuContextType | null;
};

export const MenuContext = createContext<MenuContextType>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  setIsOpen: () => {},
  isOpen: false,
  allowHover: true,
  parent: null,
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
