import { ComponentPropsWithRef, ReactNode, forwardRef, memo } from "react";
import iconVariantNormal from "@tabler/icons/outline/info-circle.svg";
import iconVariantDanger from "@tabler/icons/outline/alert-circle.svg";
import iconVariantSuccess from "@tabler/icons/outline/circle-check.svg";
import { VariantProps } from "tailwind-variants";

import { addClassNameToProps } from "@/utils/styles";
import SvgSprite, { type SvgSpirteSrc } from "@/components/atoms/svg-sprite/SvgSprite";

import { alert } from "./Alert.styles";

const ICON_MAP: Record<Exclude<VariantProps<typeof alert>["variant"], undefined>, SvgSpirteSrc> = {
  normal: iconVariantNormal,
  info: iconVariantNormal,
  danger: iconVariantDanger,
  success: iconVariantSuccess,
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

const Alert = forwardRef<HTMLDivElement, Props>(
  ({ children, variant = "normal", icon, ...props }, ref) => {
    const classes = alert({ variant });
    const defaultIcon = ICON_MAP[variant];

    return (
      <div {...addClassNameToProps(props, classes.alert())} ref={ref} role="alert">
        {icon !== false ? (
          <div className={classes.icon()}>
            {icon ?? <SvgSprite src={defaultIcon} aria-hidden />}
          </div>
        ) : null}
        <div className={classes.content()}>{children}</div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

/**
 * Alert component, with different states
 */
export default memo(Alert);
