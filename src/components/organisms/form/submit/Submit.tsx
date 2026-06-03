import type { FC, ReactNode } from "react";

import { memo, useCallback } from "react";

import { useFormContext } from "@/components/organisms/form/Form.utils";

const Submit: FC<{
  children: (canSubmit?: boolean, isSubmitting?: boolean, isFormValidating?: boolean) => ReactNode;
}> = ({ children }) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={useCallback((state) => [state.canSubmit, state.isSubmitting, state.isFormValidating], [])}
    >
      {([canSubmit, isSubmitting, isFormValidating]) => children(canSubmit, isSubmitting, isFormValidating)}
    </form.Subscribe>
  );
};

export default memo(Submit);
