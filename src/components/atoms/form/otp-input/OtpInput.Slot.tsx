import type { SlotProps } from "input-otp";
import type { FC } from "react";

import { memo } from "react";

import { otpInput } from "./OtpInput.styles";

const OtpSlot: FC<SlotProps> = ({ char, placeholderChar, isActive, hasFakeCaret }) => {
  const { slot, caret } = otpInput({ isActive });

  return (
    <div className={slot()}>
      {char ?? placeholderChar}
      {hasFakeCaret ? <span className={caret()} aria-hidden /> : null}
    </div>
  );
};

export default memo(OtpSlot);
