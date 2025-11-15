"use client";

import type { FC, ReactNode } from "react";

import { memo, useLayoutEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

export type ObjectContainWindowProps = {
  aspectRatio?: number;
  padding?: number;
  children: (size: Size) => ReactNode;
};

/**
 * This will scale the child element to fit the window (by using object-fit: contain logic).
 * This is useful for elements that do not scale well with the window size, such as iframes, maybe videos, etc.
 */
const ObjectContainWindow: FC<ObjectContainWindowProps> = ({ aspectRatio = 16 / 9, padding = 0, children }) => {
  const [size, setSize] = useState<Size>({ width: 360, height: 360 * aspectRatio });

  useLayoutEffect(() => {
    const calculateSize = () => {
      const windowSizeWithPadding = {
        width: window.innerWidth - padding * 2,
        height: window.innerHeight - padding * 2,
      };
      const windowAspectRatio = windowSizeWithPadding.width / windowSizeWithPadding.height;
      if (windowAspectRatio < aspectRatio) {
        setSize({ width: windowSizeWithPadding.width, height: windowSizeWithPadding.width / aspectRatio });
      } else {
        setSize({ width: windowSizeWithPadding.height * aspectRatio, height: windowSizeWithPadding.height });
      }
    };

    calculateSize();
    window.addEventListener("resize", calculateSize, { passive: true });

    return () => {
      window.removeEventListener("resize", calculateSize);
    };
  }, [aspectRatio, children, padding]);

  return children(size);
};

export default memo(ObjectContainWindow);
