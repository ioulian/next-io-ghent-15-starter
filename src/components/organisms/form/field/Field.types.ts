import type { ReactNode } from "react";

export type FieldProps = {
  required?: boolean;
  "aria-invalid"?: "true" | "false";
  name?: string;
  id?: string;
  disabled?: boolean;
  "aria-describedby"?: string;
  label?: ReactNode;
};
