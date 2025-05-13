import {
  Children,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";

import { useEffectOnce } from "react-use";
import { VariantProps } from "tailwind-variants";

import { layout } from "@/components/atoms/layout/Layout.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Layout.module.css";

const Heading = forwardRef<
  HTMLElement,
  {
    /**
     * Tag of the element
     */
    as?: ElementType;

    debug?: boolean;
    variant?: VariantProps<typeof layout>["variant"];
  } & ComponentPropsWithRef<"div">
>(({ debug, as = "div", variant, children, ...props }, ref) => {
  const Element = as;
  const showDebug = process.env.NODE_ENV !== "production" && debug;
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffectOnce(() => {
    // For development only, show warning if number of columns does not correspond with correct variant
    if (process.env.NODE_ENV !== "production" && typeof variant !== "undefined") {
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
    <Element
      {...addClassNameToProps(props, layout({ variant }), showDebug && styles.debug)}
      ref={innerRef}
    >
      {children}
    </Element>
  );
});

Heading.displayName = "Heading";

export default memo(Heading);
