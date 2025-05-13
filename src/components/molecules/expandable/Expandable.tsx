"use client";

import { ComponentPropsWithRef, forwardRef, memo, ReactNode } from "react";

import iconChevron from "@tabler/icons/outline/chevron-down.svg";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { expandable } from "./Expandable.styles";

const Expandable = forwardRef<
  HTMLDetailsElement,
  {
    /**
     * Title of the block
     */
    summary: ReactNode;

    /**
     * Controlled mode
     */
    open?: boolean;
  } & ComponentPropsWithRef<"details">
>(({ summary, children, open = false, ...props }, ref) => {
  const classes = expandable({ isOpen: open });

  return (
    <details {...addClassNameToProps(props, classes.expandable())} open={open} ref={ref}>
      <summary className={classes.summary()}>
        <span>{summary}</span>
        <SvgSprite className={classes.icon()} src={iconChevron} aria-hidden />
      </summary>
      <div className={classes.container()}>{children}</div>
    </details>
  );
});

Expandable.displayName = "Expandable";

/**
 * Basic, animated, <summary> alternative
 */
export default memo(Expandable);
