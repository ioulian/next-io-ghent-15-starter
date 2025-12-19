import type { Placement, UseTransitionStylesProps } from "@floating-ui/react";

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
      transitionTimingFunction: "var(--easing-swift-in)",
    };
  },
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
} satisfies UseTransitionStylesProps;

export const dialogAnimation = {
  initial: { transform: "scale(0.96)" },
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
} satisfies UseTransitionStylesProps;

export const dialogOverlayAnimation = {
  duration: {
    open: getVariableAsNumber("duration.normal"),
    close: getVariableAsNumber("duration.fast"),
  },
} satisfies UseTransitionStylesProps;

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
      transitionTimingFunction: "var(--easing-swift-in)",
    };
  },
} satisfies UseTransitionStylesProps;
