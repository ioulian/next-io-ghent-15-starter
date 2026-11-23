import type { ComponentPropsWithRef, ReactNode } from "react";

import { memo } from "react";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { expandable } from "./Expandable.styles";

export type Props = {
  /**
   * Title of the block
   */
  summary: ReactNode;

  /**
   * Controlled mode
   */
  open?: boolean;
} & ComponentPropsWithRef<"details">;

function Expandable({ summary, children, open = false, ...props }: Props) {
  const classes = expandable();

  return (
    <details {...addClassNameToProps(props, classes.expandable())} open={open}>
      <summary className={classes.summary()}>
        <span>{summary}</span>
        <SvgSprite className={classes.icon()} name="tablerChevronDown" aria-hidden />
      </summary>
      <div className={classes.container()}>{children}</div>
    </details>
  );
}

/**
 * Basic, animated, <summary> alternative
 */
export default memo(Expandable);
