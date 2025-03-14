import { ComponentPropsWithRef, forwardRef, memo } from "react";
import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";

import { paragraph } from "./Paragraph.styles";

export type ParagraphSize = VariantProps<typeof paragraph>["size"];

const Paragraph = forwardRef<
  HTMLParagraphElement,
  {
    size?: ParagraphSize;
  } & ComponentPropsWithRef<"p">
>(({ size, children, ...props }, ref) => {
  return (
    <p {...addClassNameToProps(props, paragraph({ size }))} ref={ref}>
      {children}
    </p>
  );
});

Paragraph.displayName = "Paragraph";

export default memo(Paragraph);
