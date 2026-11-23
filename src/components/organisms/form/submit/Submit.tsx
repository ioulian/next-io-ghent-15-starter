import type { ReactNode } from "react";

import { memo, useCallback } from "react";

import { useFormContext } from "@/components/organisms/form/Form.utils";

export type Props = {
  children: (canSubmit?: boolean, isSubmitting?: boolean, isFormValidating?: boolean) => ReactNode;
};

function Submit({ children }: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={useCallback((state) => [state.canSubmit, state.isSubmitting, state.isFormValidating], [])}
    >
      {([canSubmit, isSubmitting, isFormValidating]) => children(canSubmit, isSubmitting, isFormValidating)}
    </form.Subscribe>
  );
}

export default memo(Submit);
