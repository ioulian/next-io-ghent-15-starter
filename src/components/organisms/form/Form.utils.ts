import type { FormProps } from "@/components/organisms/form/Form";
import type { ReactElement } from "react";
import type { FieldValues } from "react-hook-form";

import type { FormFieldProps } from "./field/Field";

import Form from "@/components/organisms/form/Form";

import Field from "./field/Field";

export const createForm = <
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>(): {
  Form: (props: FormProps<TFieldValues, TContext, TTransformedValues>) => ReactElement;
  Field: (props: FormFieldProps<TFieldValues>) => ReactElement;
} => ({ Form, Field });
