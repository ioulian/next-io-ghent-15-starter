import type { PolymorphicProps } from "@/types/helpers";
import type { ElementType, ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { card } from "./Card.styles";

export type Props<E extends ElementType = "article"> = PolymorphicProps<
  E,
  {
    elevation?: VariantProps<typeof card>["elevation"];
    padded?: boolean;

    header?: ReactNode;
    footer?: ReactNode;
  }
>;

function Card<E extends ElementType = "article">({
  elevation,
  padded = false,
  header,
  footer,
  children,
  as,
  ...props
}: Props<E>) {
  const Component: ElementType = as ?? "article";

  const classes = card({ elevation, padded });

  return (
    <Component {...addClassNameToProps(props, classes.base())}>
      {header ? <header className={classes.header()}>{header}</header> : null}
      {children ? <div className={classes.body()}>{children}</div> : null}
      {footer ? <footer className={classes.footer()}>{footer}</footer> : null}
    </Component>
  );
}

export default memo(Card) as typeof Card;
