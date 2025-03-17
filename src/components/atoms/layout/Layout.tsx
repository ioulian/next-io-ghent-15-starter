import {
  Children,
  ComponentPropsWithRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";
import { VariantProps } from "tailwind-variants";
import { useEffectOnce } from "react-use";

import { addClassNameToProps } from "@/utils/styles";
import { layout } from "@/components/atoms/layout/Layout.styles";

import styles from "./Layout.module.css";

const Heading = forwardRef<
  HTMLDivElement,
  {
    debug?: boolean;
    variant?: VariantProps<typeof layout>["variant"];
  } & ComponentPropsWithRef<"div">
>(({ debug, variant, children, ...props }, ref) => {
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
          `You are using <Layout> with "${variant}", but only only provided ${childrenLength} child node(s). Layout node:`,
          innerRef.current,
        );
      }
    }
  });

  return (
    <div
      {...addClassNameToProps(props, layout({ variant }), showDebug && styles.debug)}
      ref={innerRef}
    >
      {children}
    </div>
  );
});

Heading.displayName = "Heading";

export default memo(Heading);
