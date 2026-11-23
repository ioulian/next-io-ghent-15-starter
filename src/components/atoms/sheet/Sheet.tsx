import type { Placement } from "@floating-ui/react";
import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { sheet } from "./Sheet.styles";

export type Props = {
  placement: Placement;
} & ComponentPropsWithRef<"div">;

function Sheet({ children, placement, ...props }: Props) {
  return (
    <div
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
}

/**
 * Sheet that will be fixed on a screen side. TO be used with Floating UI components
 */
export default memo(Sheet);
