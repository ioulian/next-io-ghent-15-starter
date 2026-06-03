"use client";

import type { ComponentPropsWithRef, FC, SubmitEventHandler } from "react";

import { memo, useCallback } from "react";

import { addClassNameToProps } from "@/utils/styles";

import { useFormContext } from "./Form.utils";

import styles from "./Form.module.css";

const Form: FC<{} & Omit<ComponentPropsWithRef<"form">, "onSubmit">> = ({
  children,

  ...props
}) => {
  const form = useFormContext();

  const onSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      form.handleSubmit();
    },
    [form],
  );

  return (
    <form.Subscribe selector={useCallback((state) => [state.isSubmitting, state.isFormValidating], [])}>
      {([isSubmitting, isFormValidating]) => (
        <form
          {...addClassNameToProps(props, styles.form)}
          onSubmit={onSubmit}
          noValidate
          aria-busy={isSubmitting || isFormValidating}
        >
          {children}
        </form>
      )}
    </form.Subscribe>
  );
};

export default memo(Form);
