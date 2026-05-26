"use client";

import type { ComponentPropsWithRef, FC } from "react";

import { memo, useCallback, useState } from "react";

import { useTranslations } from "next-intl";

import { isString } from "@/types/type-guards";
import type { PasswordStrengthProps } from "./PasswordStrength";

import Button from "../../button/Button";
import SvgSprite from "../../svg-sprite/SvgSprite";
import Input from "../input/Input";
import PasswordStrength from "./PasswordStrength";

const PasswordInput: FC<
  { showStrengthMeter?: boolean; strengthMeterProps?: PasswordStrengthProps } & ComponentPropsWithRef<"input">
> = ({ showStrengthMeter, value, strengthMeterProps, ...props }) => {
  const t = useTranslations("common.form");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onClickCallback = useCallback(() => {
    setShowPassword((newShowPassword) => !newShowPassword);
  }, []);

  return (
    <>
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        value={value}
        iconAfter={
          <Button
            iconBefore={<SvgSprite name={showPassword ? "tablerPasswordHideIcon" : "tablerPasswordShowIcon"} />}
            iconOnly
            size="base"
            variant="simple"
            onClick={onClickCallback}
          >
            {t(`passwordInput.${showPassword ? "revealPassword" : "hidePassword"}`)}
          </Button>
        }
      />
      {showStrengthMeter ? (
        <PasswordStrength {...strengthMeterProps} value={isString(value) ? value : undefined} />
      ) : null}
    </>
  );
};

// False positive

/**
 * Base input field but with some logic so show/hide password
 */
export default memo(PasswordInput);
