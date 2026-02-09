import type { ComponentPropsWithRef, FC } from "react";
import type { VariantProps } from "tailwind-variants";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { buttonGroup } from "./ButtonGroup.styles";

const ButtonGroup: FC<
  {
    /**
     * Will align right all the buttons
     */
    align?: VariantProps<typeof buttonGroup>["align"];
  } & ComponentPropsWithRef<"div">
> = ({ align = "start", ...props }) => {
  return <div {...addClassNameToProps(props, buttonGroup({ align }))} role="group" />;
};

/**
 * Will render buttons as a group
 */
export default memo(ButtonGroup);
