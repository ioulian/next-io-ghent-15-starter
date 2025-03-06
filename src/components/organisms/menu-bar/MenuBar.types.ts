import { useInteractions } from "@floating-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface MenuProps {
  label: string;
  nested?: boolean;
  children?: ReactNode;
  keepMounted?: boolean;
  orientation?: "vertical" | "horizontal" | "both";
  cols?: number;
}

export interface MenuItemProps {
  label: string;
  disabled?: boolean;
}

export type MenuContextType = {
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  setHasFocusInside: Dispatch<SetStateAction<boolean>>;
  allowHover: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  parent: MenuContextType | null;
};
