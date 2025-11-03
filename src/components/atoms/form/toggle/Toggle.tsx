"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useId } from "react";

import clsx from "clsx";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import stylesVisuallyHidden from "./../../../utils/visually-hidden/VisuallyHidden.module.css";
import styles from "./Toggle.module.css";

const Toggle: FC<{ isError?: boolean } & Omit<ComponentPropsWithRef<"input">, "children">> = ({
  isError,
  id,
  ...props
}) => {
  const internalId = useId();

  // We set aria-hidden to true, as we have another label for that element
  return (
    <div className={styles.container}>
      <input
        {...addClassNameToProps(props, styles.input, stylesVisuallyHidden.visuallyHidden)}
        id={id ?? internalId}
        type="checkbox"
      />
      <label htmlFor={id ?? internalId} className={clsx(baseInput({ isError }), styles.label)} aria-hidden="true" />
    </div>
  );
};

/**
 * Checkbox component styled as a toggle
 */
export default memo(Toggle);
