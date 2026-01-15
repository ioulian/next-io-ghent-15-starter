import type { FormFieldProps } from "@/components/molecules/form-field/FormField";
import type { FormProps } from "@/components/organisms/form/Form";
import type { ReactElement } from "react";
import type { FieldValues } from "react-hook-form";

import FormField from "@/components/molecules/form-field/FormField";
import Form from "@/components/organisms/form/Form";

export const createForm = <
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>(): {
  Form: (props: FormProps<TFieldValues, TContext, TTransformedValues>) => ReactElement;
  FormField: (props: FormFieldProps<TFieldValues>) => ReactElement;
} => ({ Form, FormField });
