import { FieldValues, Path } from "react-hook-form";

export type FormFieldError<T extends FieldValues = FieldValues> = {
  field: Path<T>;
  error: string;
};
