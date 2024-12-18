import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { heading } from "./Heading.styles";

export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = forwardRef<
  HTMLHeadingElement,
  {
    /**
     * Tag of the element
     */
    type?: HeadingType | "p" | "span";

    /**
     * (CSS) size of the text. By default it will take the tag size, but sometimes you will need h2 rendered as h1...
     */
    size?: HeadingSize;
  } & ComponentPropsWithRef<"h1">
>(({ type = "h2", size: sizeArgument, children, ...props }, ref) => {
  const Element = type;

  // Check that size is provided when it can't be inferred from type
  if (["p", "span"].includes(type) && !sizeArgument) {
    throw new Error("Size argument is required when rendering as <p> or <span>");
  }
  const size: HeadingSize = sizeArgument ?? (type as HeadingType);

  return (
    <Element {...addClassNameToProps(props, heading({ size }))} ref={ref}>
      {children}
    </Element>
  );
});

Heading.displayName = "Heading";

export default memo(Heading);
