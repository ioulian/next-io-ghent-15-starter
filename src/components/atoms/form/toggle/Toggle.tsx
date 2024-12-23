"use client";

import { ComponentPropsWithRef, forwardRef, memo, useId } from "react";
import clsx from "clsx";

import { addClassNameToProps } from "@/utils/styles";
import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";

import styles from "./Toggle.module.css";
import stylesVisuallyHidden from "./../../../utils/visually-hidden/VisuallyHidden.module.css";

const Toggle = forwardRef<
  HTMLInputElement,
  { isError?: boolean } & Omit<ComponentPropsWithRef<"input">, "children">
>(({ isError, id, ...props }, ref) => {
  const internalId = useId();

  // We set aria-hidden to true, as we have another label for that element
  return (
    <div className={styles.container}>
      <input
        {...addClassNameToProps(props, styles.input, stylesVisuallyHidden.visuallyHidden)}
        id={id ?? internalId}
        type="checkbox"
        ref={ref}
      />
      <label
        htmlFor={id ?? internalId}
        className={clsx(baseInput({ isError }), styles.label)}
        aria-hidden="true"
      />
    </div>
  );
});

Toggle.displayName = "Toggle";

/**
 * Checkbox component styled as a toggle
 */
export default memo(Toggle);
