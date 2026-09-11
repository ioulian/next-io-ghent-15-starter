"use client";

import type { OTPInputProps, RenderProps } from "input-otp";
import type { FC } from "react";

import { memo, useCallback } from "react";

import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";

import { addClassNameToProps } from "@/utils/styles";

import OtpSlot from "./OtpInput.Slot";
import { otpInput } from "./OtpInput.styles";

const DEFAULT_MAX_LENGTH = 6;

export type OtpInputProps = Omit<OTPInputProps, "render" | "children" | "maxLength"> & {
  maxLength?: number;
};

const OtpInput: FC<OtpInputProps> = ({
  maxLength = DEFAULT_MAX_LENGTH,
  pattern = REGEXP_ONLY_DIGITS,
  containerClassName,
  ...props
}) => {
  const { container } = otpInput();

  const render = useCallback(
    ({ slots }: RenderProps) => (
      <>
        {slots.map((slotState, index) => (
          <OtpSlot key={index} {...slotState} />
        ))}
      </>
    ),
    [],
  );

  return (
    <OTPInput
      {...props}
      maxLength={maxLength}
      pattern={pattern}
      containerClassName={addClassNameToProps({ className: containerClassName }, container()).className}
      render={render}
    />
  );
};

/**
 * One-time password input
 */
export default memo(OtpInput);
