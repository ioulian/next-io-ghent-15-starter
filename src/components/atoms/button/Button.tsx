"use client";

import {
  ReactNode,
  forwardRef,
  MouseEvent as ReactMouseEvent,
  isValidElement,
  cloneElement,
  memo,
  ComponentPropsWithRef,
} from "react";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { WithRequired } from "@/types/helpers";

import Spinner from "../spinner/Spinner";

import { button } from "./Button.styles";

type Props = {
  /**
   * Variant of the button
   */
  variant?: VariantProps<typeof button>["variant"];

  /**
   * Size of the button
   */
  size?: VariantProps<typeof button>["size"];

  /**
   * Should button be rendered full width
   */
  fullWidth?: boolean;

  /**
   * Show progress bar
   */
  isLoading?: boolean;

  /**
   * Add an icon before
   */
  iconBefore?: ReactNode;

  /**
   * Add an icon after
   */
  iconAfter?: ReactNode;

  /**
   * Will hide children and show icons only
   */
  iconOnly?: boolean;

  /**
   * Should the element be able to be clicked on
   */
  disabled?: boolean;
} & ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, WithRequired<Props, "children">>(
  (
    {
      variant,
      size,
      fullWidth,
      iconOnly,
      iconBefore,
      iconAfter,
      isLoading = false,
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const t = useTranslations("common.button");
    const newOnClick = useCallback(
      (
        e: ReactMouseEvent<HTMLButtonElement, MouseEvent> &
          ReactMouseEvent<HTMLAnchorElement, MouseEvent>,
      ) => {
        if (!isLoading && !disabled) {
          onClick?.(e);
        }
      },
      [onClick, isLoading, disabled],
    );

    const classes = button({ variant, size, isLoading, fullWidth });

    return (
      <button
        type="button"
        {...props}
        ref={ref}
        disabled={disabled}
        aria-disabled={isLoading || disabled ? true : undefined}
        onClick={onClick ? newOnClick : undefined}
        {...addClassNameToProps(props, classes.button())}
      >
        <span className={classes.content()}>
          {isValidElement<Record<string, unknown>>(iconBefore) &&
            cloneElement(iconBefore, {
              "aria-hidden": "true",
              className: classes.icon(),
            })}
          {iconOnly ? <VisuallyHidden>{children}</VisuallyHidden> : <span>{children}</span>}
          {isValidElement<Record<string, unknown>>(iconAfter) &&
            cloneElement(iconAfter, {
              "aria-hidden": "true",
              className: classes.icon(),
            })}
        </span>
        <Spinner
          className={classes.spinner()}
          aria-live={isLoading ? "assertive" : "off"}
          aria-hidden={!isLoading}
          aria-label={isLoading ? t("spinner.aria-label") : ""}
        />
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * Generic button component
 */
export default memo(Button);
