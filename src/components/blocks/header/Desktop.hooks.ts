"use client";

import { ReactNode, useContext } from "react";

import { HeaderContext } from "./Header.context";

export const useHeaderContext = () => useContext(HeaderContext);

export const useTopMenuItems = (): ReactNode => {
  const { topMenu } = useContext(HeaderContext);

  return topMenu;
};

export const useActions = (): ReactNode => {
  const { actions } = useContext(HeaderContext);

  return actions;
};
