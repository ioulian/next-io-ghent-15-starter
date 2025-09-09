import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import { VariantProps } from "tailwind-variants";

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
  return <div {...addClassNameToProps(props, buttonGroup({ align }))} />;
};

/**
 * Will render buttons as a group
 */
export default memo(ButtonGroup);
