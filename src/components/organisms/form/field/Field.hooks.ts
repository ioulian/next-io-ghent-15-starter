import type { ChangeEventHandler } from "react";

import { useCallback } from "react";

import { useFieldContext } from "@/components/organisms/form/Form.utils";

export const useBaseChangeHandler = <
  ValueType = string,
  ElType extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
>() => {
  const field = useFieldContext<ValueType>();

  return useCallback<ChangeEventHandler<ElType>>(
    (e) => {
      field.handleChange(e.target.value as ValueType);
    },
    [field],
  );
};
