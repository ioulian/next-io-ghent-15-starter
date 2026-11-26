import type { PolymorphicProps } from "@/types/helpers";
import type { ElementType } from "react";
import type { VariantProps } from "tailwind-variants";

import { Children, memo, useImperativeHandle, useRef } from "react";

import { useEffectOnce } from "react-use";

import { isUndefined } from "@/types/type-guards";

import { layout } from "@/components/atoms/layout/Layout.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Layout.module.css";

export type Props<E extends ElementType = "div"> = PolymorphicProps<
  E,
  {
    debug?: boolean;
    variant?: VariantProps<typeof layout>["variant"];
  }
>;

function Layout<E extends ElementType = "div">({ debug, variant, children, as, ref, ...props }: Props<E>) {
  const Component: ElementType = as ?? "div";
  const showDebug = process.env.NODE_ENV !== "production" && debug;
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffectOnce(() => {
    // For development only, show warning if number of columns does not correspond with correct variant
    if (process.env.NODE_ENV !== "production" && !isUndefined(variant)) {
      const childrenLength = Children.count(children);

      const oneColError = variant === "oneCol" && childrenLength !== 1;
      const twoColError = variant.startsWith("twoCol") && childrenLength !== 2;
      const threeColError = variant.startsWith("threeCol") && childrenLength !== 3;
      const fourColError = variant === "fourCol" && childrenLength !== 4;

      if (oneColError || twoColError || threeColError || fourColError) {
        console.warn(
          `You are using <Layout> with "${variant}", but only only provided ${childrenLength} child node(s). Node:`,
          innerRef.current,
        );
      }
    }
  });

  return (
    <Component {...addClassNameToProps(props, layout({ variant }), showDebug && styles.debug)} ref={innerRef}>
      {children}
    </Component>
  );
}

export default memo(Layout);
