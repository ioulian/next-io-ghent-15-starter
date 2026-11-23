import type { MouseEventHandler, ReactNode } from "react";

import { memo, useCallback } from "react";

import { useFormContext } from "@/components/organisms/form/Form.utils";

export type Props = {
  children: (reset: MouseEventHandler<HTMLButtonElement>, canReset: boolean) => ReactNode;
};

function Reset({ children }: Props) {
  const form = useFormContext();

  const reset = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();

      form.reset();
    },
    [form],
  );

  return (
    <form.Subscribe selector={useCallback((state) => state.isDefaultValue, [])}>
      {(isDefaultValue) => children(reset, !isDefaultValue)}
    </form.Subscribe>
  );
}

export default memo(Reset);
