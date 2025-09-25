import type { Placement } from "@floating-ui/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";

export const zoomAnimation = {
  initial: ({ side }: { side: Placement }) => {
    let transformOrigin: string | undefined;
    let translate: string | undefined;
    if (side === "top") {
      transformOrigin = "bottom";
      translate = "translateY(2px)";
    }

    if (side === "bottom") {
      transformOrigin = "top";
      translate = "translateY(-2px)";
    }

    if (side === "left") {
      transformOrigin = "right";
      translate = "translateX(2px)";
    }

    if (side === "right") {
      transformOrigin = "left";
      translate = "translateX(-2px)";
    }

    return {
      transform: `scale(0.96) ${translate}`,
      opacity: 0,
      transformOrigin,
    };
  },
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
} as const;

export const dialogAnimation = {
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
};

export const sheetSlideAnimation = {
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
  initial: ({ side }: { side: Placement }) => {
    let transform: string | undefined;
    if (side === "top") {
      transform = "translate3d(0, -100%, 0)";
    }

    if (side === "bottom") {
      transform = "translate3d(0, 100%, 0)";
    }

    if (side === "left") {
      transform = "translate3d(-100%, 0, 0)";
    }

    if (side === "right") {
      transform = "translate3d(100%, 0, 0)";
    }

    return {
      transform,
    };
  },
};
