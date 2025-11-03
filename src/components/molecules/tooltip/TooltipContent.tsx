"use client";

import type { FC } from "react";

import { HTMLProps, memo, useMemo } from "react";

import { FloatingPortal, useMergeRefs, useTransitionStyles } from "@floating-ui/react";

import Floater from "@/components/atoms/floater/Floater";
import { zoomAnimation } from "@/components/atoms/floater/Floater.animations";

import { useTooltipContext } from "./hooks";

const TooltipContent: FC<HTMLProps<HTMLDivElement>> = ({ ref: propRef, ...props }) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { isMounted, styles } = useTransitionStyles(context.context, zoomAnimation);
  const position = useMemo(() => ({ x: context.x ?? 0, y: context.y ?? 0 }), [context.x, context.y]);

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal>
      <Floater
        ref={ref}
        position={position}
        arrowPosition={context.middlewareData.arrow}
        strategy={context.strategy}
        placement={context.placement}
        arrowCallback={context.arrowCallback}
        {...context.getFloatingProps(props)}
        style={styles}
      />
    </FloatingPortal>
  );
};

export default memo(TooltipContent);
