import type { AnyFieldApi } from "@tanstack/react-form";

import { memo } from "react";

import FieldError from "@/components/atoms/form/field-error/FieldError";

export type Props = { field: AnyFieldApi; id?: string };

function FieldInfo({ field, id }: Props) {
  return (
    <div id={id}>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <FieldError>{field.state.meta.errors.map((error) => error.message).join(",")}</FieldError>
      ) : null}
    </div>
  );
}

export default memo(FieldInfo);
