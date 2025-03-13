import { createContext } from "react";

import { MenuContextType } from "./MenuBar.types";

export const MenuContext = createContext<MenuContextType>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  allowHover: true,
  isOpen: false,
  setIsOpen: () => {},
  parent: null,
});
