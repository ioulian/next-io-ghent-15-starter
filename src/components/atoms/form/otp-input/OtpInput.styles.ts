import { tv } from "tailwind-variants";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";

import styles from "./OtpInput.module.css";

export const otpInput = tv({
  slots: {
    container: styles.container,
    slot: [baseInput(), styles.slot],
    caret: styles.caret,
  },
  variants: {
    isActive: {
      true: {
        slot: styles.slotActive,
      },
    },
  },
});
