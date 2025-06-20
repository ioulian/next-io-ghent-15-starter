"use client";

import { ComponentPropsWithRef, forwardRef, memo, useCallback, useState } from "react";

import passwordHideIcon from "@tabler/icons/outline/eye-off.svg";
import passwordShowIcon from "@tabler/icons/outline/eye.svg";
import { useTranslations } from "next-intl";

import Button from "../../button/Button";
import SvgSprite from "../../svg-sprite/SvgSprite";
import Input from "../input/Input";
import PasswordStrength from "./PasswordStrength";

const PasswordInput = forwardRef<
  HTMLInputElement,
  { showStrengthMeter?: boolean } & ComponentPropsWithRef<"input">
>(({ showStrengthMeter, ...props }, ref) => {
  const t = useTranslations("common.form");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onClickCallback = useCallback(() => {
    setShowPassword((newShowPassword) => !newShowPassword);
  }, []);

  return (
    <>
      <Input
        ref={ref}
        {...props}
        type={showPassword ? "text" : "password"}
        iconAfter={
          <Button
            iconBefore={<SvgSprite src={showPassword ? passwordHideIcon : passwordShowIcon} />}
            iconOnly
            size="base"
            variant="simple"
            onClick={onClickCallback}
          >
            {t(`passwordInput.${showPassword ? "revealPassword" : "hidePassword"}`)}
          </Button>
        }
      />
      {showStrengthMeter && props.name ? <PasswordStrength name={props.name} /> : null}
    </>
  );
});

// False positive
// eslint-disable-next-line sonarjs/no-hardcoded-passwords
PasswordInput.displayName = "PasswordInput";

/**
 * Base input field but with some logic so show/hide password
 */
export default memo(PasswordInput);
