"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode } from "react";

import iconChevron from "@tabler/icons/outline/chevron-down.svg";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { expandable } from "./Expandable.styles";

const Expandable: FC<
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
> = ({ summary, children, open = false, ...props }) => {
  const classes = expandable({ isOpen: open });

  return (
    <details {...addClassNameToProps(props, classes.expandable())} open={open}>
      <summary className={classes.summary()}>
        <span>{summary}</span>
        <SvgSprite className={classes.icon()} src={iconChevron} aria-hidden />
      </summary>
      <div className={classes.container()}>{children}</div>
    </details>
  );
};

/**
 * Basic, animated, <summary> alternative
 */
export default memo(Expandable);
