import type { AnyFieldApi } from "@tanstack/react-form";
import type { FC } from "react";

import { memo } from "react";

import FieldError from "@/components/atoms/form/field-error/FieldError";

const FieldInfo: FC<{ field: AnyFieldApi; id?: string }> = ({ field, id }) => {
  return (
    <div id={id}>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <FieldError>{field.state.meta.errors.map((error) => error.message).join(",")}</FieldError>
      ) : null}
    </div>
  );
};

export default memo(FieldInfo);
