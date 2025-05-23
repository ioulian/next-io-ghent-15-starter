"use client";

import {
  cloneElement,
  ComponentPropsWithRef,
  forwardRef,
  isValidElement,
  memo,
  ReactNode,
} from "react";

import { PolyForwardMemoComponent, PolyRefFunction } from "react-polymorphed";
import { VariantProps } from "tailwind-variants";

import { WithRequired } from "@/types/helpers";

import { button } from "@/components/atoms/button/Button.styles";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./LinkButton.module.css";

export type Props = {
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
} & ComponentPropsWithRef<"a">;

const polyRef = forwardRef as PolyRefFunction;

const LinkButton = polyRef<"a", WithRequired<Props, "children">>(
  (
    {
      as: Element = "a",
      variant,
      size,
      fullWidth,
      iconOnly,
      iconBefore,
      iconAfter,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = button({ variant, size, fullWidth });

    return (
      <Element ref={ref} {...addClassNameToProps(props, classes.button(), styles.linkButton)}>
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
      </Element>
    );
  },
);

LinkButton.displayName = "LinkButton";

/**
 * LinkButton component
 */
export default memo(LinkButton) as PolyForwardMemoComponent<"a", Props>;
