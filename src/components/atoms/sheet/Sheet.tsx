import { ComponentPropsWithRef, forwardRef, memo } from "react";
import { Placement } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

import { sheet } from "./Sheet.styles";

const Sheet = forwardRef<
  HTMLDivElement,
  {
    placement: Placement;
  } & ComponentPropsWithRef<"div">
>(({ children, placement, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...addClassNameToProps(
        props,
        sheet({
          placement: placement.split("-")[0] as "top" | "bottom" | "right" | "left",
        }),
      )}
    >
      {children}
    </div>
  );
});

Sheet.displayName = "Sheet";

/**
 * Sheet that will be fixed on a screen side. TO be used with Floating UI components
 */
export default memo(Sheet);
