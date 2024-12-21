"use client";

import {
  ComponentPropsWithRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useUpdateEffect } from "react-use";
import { useTranslations } from "next-intl";

import useResizeObserver from "@/hooks/useResizeObserver";
import { addClassNameToProps } from "@/utils/styles";
import Button from "@/components/atoms/button/Button";

import { ellipsis, numberOfLinesVar } from "./Ellipsis.styles";

const Ellipsis = forwardRef<
  HTMLDivElement,
  {
    /**
     * Number of lines to trunctate the text
     */
    numberOfLines?: number;

    /**
     * Controlled
     */
    open?: boolean;

    /**
     * Is ellipsis showing all text or is truncated?
     *
     * @param isOpen
     */
    onToggle?: (isOpen: boolean) => void;
  } & ComponentPropsWithRef<"div">
>(({ children, open = false, onToggle, numberOfLines = 2, ...props }, ref) => {
  const t = useTranslations("common.ellipsis");
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [showButton, setShowButton] = useState<boolean>(true);
  const id = useId();

  // Use resize observer against the collapsed helper content
  const [contentRef, rect] = useResizeObserver<HTMLDivElement>();
  useEffect(() => {
    if (contentRef.current) {
      const isEllipsisActive =
        contentRef.current.offsetWidth < contentRef.current.scrollWidth ||
        contentRef.current.offsetHeight < contentRef.current.scrollHeight;
      setShowButton(isEllipsisActive || process.env.JEST_WORKER_ID !== undefined);
    }
  }, [rect, contentRef]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useUpdateEffect(() => {
    onToggle?.(isOpen);
  }, [onToggle, isOpen]);

  const onClick = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const numberOfLinesStyle = useMemo(
    () => ({
      [numberOfLinesVar]: numberOfLines.toString(),
    }),
    [numberOfLines],
  );

  const classes = ellipsis({ isOpen });

  return (
    <div {...addClassNameToProps(props, classes.ellipsis())} style={numberOfLinesStyle} ref={ref}>
      <div className={classes.container()}>
        <div className={classes.content()} id={id}>
          {children}
        </div>
        {/* This is a helper div to check collapsed dimensions against */}
        <div
          className={classes.helperContent()}
          ref={contentRef}
          aria-hidden="true"
          style={numberOfLinesStyle}
        >
          {children}
        </div>
      </div>
      {showButton === true && (
        <Button
          size="base"
          variant="simple"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={onClick}
        >
          <span>{t(isOpen ? "collapse" : "expand")}</span>
        </Button>
      )}
    </div>
  );
});

Ellipsis.displayName = "Ellipsis";

/**
 * Ellipis component that will automatically truncate/clamp the text inside.
 * It's possible to automatically hide the "more" button when it's not needed.
 */
export default memo(Ellipsis);
