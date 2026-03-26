"use client";

import type { ChangeEvent, ComponentPropsWithRef, FC } from "react";

import { memo, useCallback, useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import Button from "../../button/Button";
import SvgSprite from "../../svg-sprite/SvgSprite";
import Input from "../input/Input";
import PasswordStrength from "./PasswordStrength";

const PasswordInput: FC<{ showStrengthMeter?: boolean } & ComponentPropsWithRef<"input">> = ({
  showStrengthMeter,
  value,
  onChange,
  ...props
}) => {
  const t = useTranslations("common.form");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<string | undefined>(value as string | undefined);

  const onClickCallback = useCallback(() => {
    setShowPassword((newShowPassword) => !newShowPassword);
  }, []);

  const newOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      setLocalValue(event.target.value);
    },
    [onChange],
  );

  // TODO: maybe move passwordstrength somewhere to not have localValue here
  useEffect(() => {
    // We need to update local state when value changes
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state, react-hooks/set-state-in-effect
    setLocalValue(value as string | undefined);
  }, [value]);

  return (
    <>
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        value={localValue}
        onChange={newOnChange}
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
      {showStrengthMeter ? <PasswordStrength value={localValue} /> : null}
    </>
  );
};

// False positive

/**
 * Base input field but with some logic so show/hide password
 */
export default memo(PasswordInput);
