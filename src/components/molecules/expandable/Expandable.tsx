"use client";

import {
  ComponentPropsWithRef,
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import iconChevron from "@tabler/icons/outline/chevron-down.svg";
import AnimateHeight from "react-animate-height";
import { useUpdateEffect } from "react-use";

import { easings } from "@/utils/easings";
import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { expandable } from "./Expandable.styles";

const Expandable = forwardRef<
  HTMLDivElement,
  {
    /**
     * Title of the block
     */
    summary: ReactNode;

    /**
     * Controlled mode
     */
    open?: boolean;

    /**
     * Is expandable currently open or not?
     *
     * @param isOpen
     */
    onToggle?: (isOpen: boolean) => void;
  } & ComponentPropsWithRef<"div">
>(({ summary, children, open = false, onToggle, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const id = useId();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useUpdateEffect(() => {
    onToggle?.(isOpen);
  }, [onToggle, isOpen]);

  const onClick = useCallback(() => {
    setIsOpen((newIsOpen) => !newIsOpen);
  }, []);

  const classes = expandable({ isOpen });

  return (
    <div {...addClassNameToProps(props, classes.expandable())} ref={ref}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onClick}
        className={classes.summary()}
      >
        <span>{summary}</span>
        <SvgSprite className={classes.icon()} src={iconChevron} aria-hidden />
      </button>
      <AnimateHeight
        id={id}
        easing={easings.easeOutCubic}
        duration={getVariableAsNumber("duration.slow")}
        height={isOpen ? "auto" : 0}
      >
        <div className={classes.container()}>{children}</div>
      </AnimateHeight>
    </div>
  );
});

Expandable.displayName = "Expandable";

/**
 * Basic, animated, <summary> alternative
 */
export default memo(Expandable);
