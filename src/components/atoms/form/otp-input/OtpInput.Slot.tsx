import type { SlotProps } from "input-otp";

import { memo } from "react";

import { otpInput } from "./OtpInput.styles";

export type Props = SlotProps;

function OtpSlot({ char, placeholderChar, isActive, hasFakeCaret }: Props) {
  const { slot, caret } = otpInput({ isActive });

  return (
    <div className={slot()}>
      {char ?? placeholderChar}
      {hasFakeCaret ? <span className={caret()} aria-hidden /> : null}
    </div>
  );
}

export default memo(OtpSlot);
