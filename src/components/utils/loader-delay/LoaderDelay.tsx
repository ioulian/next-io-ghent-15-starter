"use client";

import { FC, memo, PropsWithChildren, useEffect, useState } from "react";

import { LOADER_DELAY } from "@/utils/constants";

const LoaderDelay: FC<
  PropsWithChildren<{
    /**
     * Delay after which to show the children
     */
    delay?: number;
  }>
> = ({ children, delay = LOADER_DELAY }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShown(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return isShown ? children : null;
};

/**
 * Component will delay rendering of the children.
 * Usefull when showing loaders
 */
export default memo(LoaderDelay);
