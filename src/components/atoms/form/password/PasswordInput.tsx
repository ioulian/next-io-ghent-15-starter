"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useCallback, useState } from "react";

import { useTranslations } from "next-intl";

import Button from "../../button/Button";
import SvgSprite from "../../svg-sprite/SvgSprite";
import Input from "../input/Input";
import PasswordStrength from "./PasswordStrength";

const PasswordInput: FC<{ showStrengthMeter?: boolean } & ComponentPropsWithRef<"input">> = ({
  showStrengthMeter,
  ...props
}) => {
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
      {showStrengthMeter && props.name ? <PasswordStrength name={props.name} /> : null}
    </>
  );
};

// False positive

/**
 * Base input field but with some logic so show/hide password
 */
export default memo(PasswordInput);
