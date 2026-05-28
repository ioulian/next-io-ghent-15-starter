import type { FC, MouseEventHandler, ReactNode } from "react";

import { memo, useCallback } from "react";

import { useStore } from "@tanstack/react-form";

import { useFormContext } from "@/components/organisms/form/Form.utils";

const Reset: FC<{
  children: (reset: MouseEventHandler<HTMLButtonElement>, canReset: boolean) => ReactNode;
}> = ({ children }) => {
  const form = useFormContext();

  const canReset = useStore(form.store, (state) => !state.isDefaultValue);
  const reset = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();

      form.reset();
    },
    [form],
  );

  return children(reset, canReset);
};

export default memo(Reset);
