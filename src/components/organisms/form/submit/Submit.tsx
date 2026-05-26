import type { FC, ReactNode } from "react";

import { memo } from "react";

import { useStore } from "@tanstack/react-form";

import { useFormContext } from "@/components/organisms/form/Form.utils";

const Submit: FC<{
  children: (canSubmit: boolean, isSubmitting: boolean, isFormValidating: boolean) => ReactNode;
}> = ({ children }) => {
  const form = useFormContext();

  const canSubmit = useStore(form.store, (state) => state.canSubmit);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isFormValidating = useStore(form.store, (state) => state.isFormValidating);

  return children(canSubmit, isSubmitting, isFormValidating);
};

export default memo(Submit);
