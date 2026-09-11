import type { ComponentPropsWithRef, FC } from "react";

import { memo, useCallback } from "react";

import type { FieldProps } from "./Field.types";

import OtpInput from "@/components/atoms/form/otp-input/OtpInput";

import { useFieldContext } from "../Form.utils";

type InputOtpProps = FieldProps & ComponentPropsWithRef<typeof OtpInput>;

const InputOtp: FC<InputOtpProps> = ({ ...props }) => {
  const field = useFieldContext<string>();
  const onChange = useCallback(
    (value: string) => {
      field.handleChange(value);
    },
    [field],
  );

  return <OtpInput {...props} value={field.state.value} onChange={onChange} onBlur={field.handleBlur} />;
};

export default memo(InputOtp);
