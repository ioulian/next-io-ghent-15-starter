"use client";

import { FloatingPortal, useMergeRefs, useTransitionStyles } from "@floating-ui/react";
import { HTMLProps, forwardRef, memo, useMemo } from "react";

import Floater from "@/components/atoms/floater/Floater";
import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";

import { useTooltipContext } from "./hooks";

const TooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, propRef) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { isMounted, styles } = useTransitionStyles(context.context, {
    duration: {
      open: getVariableAsNumber("duration.normal"),
      close: getVariableAsNumber("duration.fast"),
    },
  });
  const position = useMemo(
    () => ({ x: context.x ?? 0, y: context.y ?? 0 }),
    [context.x, context.y],
  );

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
});

TooltipContent.displayName = "TooltipContent";

export default memo(TooltipContent);
