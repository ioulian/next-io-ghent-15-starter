import { ComponentPropsWithRef, CSSProperties, forwardRef, memo, useMemo } from "react";

import { Coords, Placement, Strategy } from "@floating-ui/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import { addClassNameToProps, roundByDPR } from "@/utils/styles";

import styles from "./Floater.module.css";

const Floater = forwardRef<
  HTMLDivElement,
  {
    position?: { x: number | null; y: number | null };
    arrowPosition?: Partial<Coords>;
    strategy?: Strategy;
    placement?: Placement;
    arrowCallback?: (node: HTMLDivElement | null) => void;
    showArrow?: boolean;
  } & ComponentPropsWithRef<"div">
>(
  (
    {
      children,
      position,
      arrowPosition,
      strategy,
      placement,
      arrowCallback,
      showArrow = true,
      ...props
    },
    ref,
  ) => {
    const style = useMemo<CSSProperties>(
      () => ({
        transform: position
          ? `translate3d(${roundByDPR(position.x ?? 0)}px, ${roundByDPR(position.y ?? 0)}px, 0)`
          : undefined,
        position: strategy ?? "relative",
        // eslint-disable-next-line sonarjs/no-nested-conditional
        visibility: position ? (position.x === null ? "hidden" : "visible") : undefined,
        ...props.style,
      }),
      [position, props.style, strategy],
    );

    const arrowStyle = useMemo(() => {
      let staticSide: string | undefined;
      let rotation: string | undefined;
      if (placement) {
        const placementFirst = placement.split("-")[0];
        staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[placementFirst] as string;
        rotation = {
          top: "rotate(135deg)",
          right: "rotate(-135deg)",
          bottom: "rotate(-45deg)",
          left: "rotate(45deg)",
        }[placementFirst] as string;
        return {
          left:
            typeof arrowPosition?.x !== "undefined" && arrowPosition?.x !== null
              ? `${arrowPosition.x}px`
              : "",
          top:
            typeof arrowPosition?.y !== "undefined" && arrowPosition?.y !== null
              ? `${arrowPosition.y}px`
              : "",
          [staticSide]: `-${getVariableAsNumber("floater.arrow.size") / 2}px`,
          transform: rotation,
        };
      }
    }, [arrowPosition?.x, arrowPosition?.y, placement]);

    return (
      <div ref={ref} {...addClassNameToProps(props, styles.floater)} style={style}>
        {children}
        {showArrow && arrowCallback ? (
          <div ref={arrowCallback} className={styles.arrow} style={arrowStyle} />
        ) : null}
      </div>
    );
  },
);

Floater.displayName = "Floater";

/**
 * Floater window used in Floating UI Components
 */
export default memo(Floater);
