"use client";

import type { ComponentPropsWithRef, FC, SubmitEventHandler } from "react";

import { memo, useCallback } from "react";

import { useStore } from "@tanstack/react-form";

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
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isFormValidating = useStore(form.store, (state) => state.isFormValidating);

  return (
    <form
      {...addClassNameToProps(props, styles.form)}
      onSubmit={onSubmit}
      noValidate
      aria-busy={isSubmitting || isFormValidating}
    >
      {children}
    </form>
  );
};

export default memo(Form);
