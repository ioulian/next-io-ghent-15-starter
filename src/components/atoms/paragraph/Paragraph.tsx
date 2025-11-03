import type { FC } from "react";

import { ComponentPropsWithRef, memo, useMemo } from "react";

import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";

import { paragraph } from "./Paragraph.styles";

export type ParagraphSize = VariantProps<typeof paragraph>["size"];

const Paragraph: FC<
  {
    size?: ParagraphSize;
    maxLines?: number;
  } & ComponentPropsWithRef<"p">
> = ({ size, children, maxLines, ...props }) => {
  const isClamped = typeof maxLines === "number";
  const style = useMemo(
    () => (isClamped ? { ["--paragraph-number-of-lines"]: maxLines } : undefined),
    [maxLines, isClamped],
  );

  return (
    <p {...addClassNameToProps(props, paragraph({ size, clamped: typeof maxLines === "number" }))} style={style}>
      {children}
    </p>
  );
};

Paragraph.displayName = "Paragraph";

export default memo(Paragraph);
