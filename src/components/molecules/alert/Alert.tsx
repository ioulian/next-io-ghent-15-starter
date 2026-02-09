import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { memo } from "react";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { alert } from "./Alert.styles";

const ICON_MAP: Record<Exclude<VariantProps<typeof alert>["variant"], undefined>, SvgSpriteName> = {
  normal: "tablerInfoCircle",
  info: "tablerInfoCircle",
  danger: "tablerAlertCircle",
  success: "tablerCircleCheck",
};

interface Props extends ComponentPropsWithRef<"div"> {
  /**
   * Icon to show. Set to `false` for no icon. If nothing is passed, default icons are shown.
   */
  icon?: ReactNode | false;

  /**
   * Variant of the alert
   */
  variant?: VariantProps<typeof alert>["variant"];
}

const Alert: FC<Props> = ({ children, variant = "normal", icon, ...props }) => {
  const classes = alert({ variant });
  const defaultIcon = ICON_MAP[variant];

  return (
    <div {...addClassNameToProps(props, classes.alert())} role="alert">
      {icon !== false ? (
        <div className={classes.icon()}>{icon ?? <SvgSprite name={defaultIcon} aria-hidden />}</div>
      ) : null}
      <div className={classes.content()}>{children}</div>
    </div>
  );
};

/**
 * Alert component, with different states
 */
export default memo(Alert);
