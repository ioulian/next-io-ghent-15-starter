import { ComponentPropsWithRef, forwardRef, memo } from "react";
import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";

import { buttonGroup } from "./ButtonGroup.styles";

const ButtonGroup = forwardRef<
  HTMLDivElement,
  {
    /**
     * Will align right all the buttons
     */
    align?: VariantProps<typeof buttonGroup>["align"];
  } & ComponentPropsWithRef<"div">
>(({ align = "start", ...props }, ref) => {
  return <div {...addClassNameToProps(props, buttonGroup({ align }))} ref={ref} />;
});

ButtonGroup.displayName = "ButtonGroup";

/**
 * Will render buttons as a group
 */
export default memo(ButtonGroup);
