import type { ComponentPropsWithRef, FC } from "react";
import type { VariantProps } from "tailwind-variants";

import { memo, useMemo } from "react";

import { isNumber } from "@/types/type-guards";

import { addClassNameToProps } from "@/utils/styles";

import { paragraph } from "./Paragraph.styles";

export type ParagraphSize = VariantProps<typeof paragraph>["size"];

const Paragraph: FC<
  {
    size?: ParagraphSize;
    maxLines?: number;
  } & ComponentPropsWithRef<"p">
> = ({ size, children, maxLines, style, ...props }) => {
  const isClamped = isNumber(maxLines);
  const newStyle = useMemo(
    () => ({
      ...(style ?? {}),
      ...(isClamped ? { ["--paragraph-number-of-lines"]: maxLines } : undefined),
    }),
    [maxLines, isClamped, style],
  );

  return (
    <p {...addClassNameToProps(props, paragraph({ size, clamped: isNumber(maxLines) }))} style={newStyle}>
      {children}
    </p>
  );
};

Paragraph.displayName = "Paragraph";

export default memo(Paragraph);
