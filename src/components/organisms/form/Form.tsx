"use client";

import { ComponentPropsWithRef, FormEvent, useCallback, useEffect } from "react";

import {
  DeepPartial,
  FieldErrors,
  FieldValues,
  FormProvider,
  Path,
  useForm,
  UseFormProps,
} from "react-hook-form";

import { BE_VALIDATION } from "@/components/organisms/form/constants";
import { FormFieldError } from "@/components/organisms/form/types";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Form.module.css";

/**
 * Wrapper around `react-hook-form`.
 */
const Form = <
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  /**
   * Is current form loading, will not trigger onSubmit when loading
   */
  isLoading,

  /**
   * Form field errors
   */
  fieldErrors,

  /**
   * Triggered on form submit
   */
  onSubmit,

  /**
   * When form can't be submitted when there are errors
   */
  onError,

  /**
   * Triggered on change of any field
   */
  onChange,

  children,
  formSettings,
  ...props
}: {
  fieldErrors?: FormFieldError<TFieldValues>[];
  isLoading?: boolean;
  onSubmit?: (data: TTransformedValues, submitter?: HTMLElement) => void;
  onError?: (errors: FieldErrors<TFieldValues>) => void;
  onChange?: (data?: DeepPartial<TFieldValues> | TFieldValues) => void;
  formSettings?: UseFormProps<TFieldValues, TContext, TTransformedValues>;
} & Omit<ComponentPropsWithRef<"form">, "onChange" | "onSubmit">) => {
  const methods = useForm<TFieldValues, TContext, TTransformedValues>({
    mode: "onSubmit",
    ...formSettings,
  });
  const { handleSubmit, setError, clearErrors, watch, setFocus, reset } = methods;
  // The double onChange callback is only in dev (probably with strict mode), we set this to true only for development

  // Subscribe to onChange event
  useEffect(() => {
    const subscription = watch((values) => {
      onChange?.(values);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, onChange]);

  // Show errors and set focus to first error field
  useEffect(() => {
    if (Array.isArray(fieldErrors) && fieldErrors.length !== 0) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent
      fieldErrors.forEach(({ field, error: message }, i) => {
        setTimeout(() => {
          setError(field as Path<TFieldValues>, {
            type: BE_VALIDATION,
            message,
          });
        }, 0);

        if (i === 0) {
          try {
            // Can fail on HMR
            setFocus(field as Path<TFieldValues>);
            /* c8 ignore next */ // eslint-disable-next-line sonarjs/no-ignored-exceptions, @typescript-eslint/no-unused-vars
          } catch (e) {}
        }
      });
    } else {
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrors]);

  // Update form when values are passed so we always have correct values showing in the fields
  // This is a workaround as by default react-hook-form is uncontrolled
  useEffect(() => {
    if (formSettings?.values && Array.isArray(fieldErrors) && fieldErrors.length !== 0) {
      reset(formSettings?.values);
    }
  }, [formSettings?.values, reset, fieldErrors]);

  const onSubmitCallback = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!isLoading) {
        if (onSubmit) {
          // @ts-expect-error submitter exists, needs checking in types
          const submitter = e.nativeEvent.submitter;

          handleSubmit((data) => {
            onSubmit(data, submitter);
          }, onError)(e);
        } else {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    },
    [handleSubmit, isLoading, onSubmit, onError],
  );

  return (
    <FormProvider {...methods}>
      <form
        {...addClassNameToProps(props, styles.form)}
        onSubmit={onSubmitCallback}
        noValidate
        aria-busy={isLoading}
      >
        {/*error && error.title ? <ApiFormError error={error} /> : null*/}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
