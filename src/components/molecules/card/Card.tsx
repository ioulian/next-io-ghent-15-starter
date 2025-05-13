import { ComponentPropsWithRef, ElementType, forwardRef, memo, ReactNode } from "react";

import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";

import { card } from "./Card.styles";

const Card = forwardRef<
  HTMLElement,
  {
    /**
     * Tag of the element
     */
    as?: ElementType;

    elevation?: VariantProps<typeof card>["elevation"];
    padded?: boolean;

    header?: ReactNode;
    footer?: ReactNode;
  } & ComponentPropsWithRef<"article">
>(({ elevation, as = "article", padded = false, header, footer, children, ...props }, ref) => {
  const Element = as;

  const classes = card({ elevation, padded });

  return (
    <Element {...addClassNameToProps(props, classes.base())} ref={ref}>
      {header ? <header className={classes.header()}>{header}</header> : null}
      {children ? <div className={classes.body()}>{children}</div> : null}
      {footer ? <footer className={classes.footer()}>{footer}</footer> : null}
    </Element>
  );
});

Card.displayName = "Card";

export default memo(Card);
