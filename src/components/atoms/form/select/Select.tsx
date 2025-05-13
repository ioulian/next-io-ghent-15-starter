import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { useTranslations } from "next-intl";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Select.module.css";

const Select = forwardRef<
  HTMLSelectElement,
  {
    /**
     * Add empty option as first item
     */
    addEmptyOption?: boolean | string;
    isError?: boolean;
  } & ComponentPropsWithRef<"select">
>(({ addEmptyOption = false, children, isError, ...props }, ref) => {
  const t = useTranslations("common.form");

  return (
    <select {...addClassNameToProps(props, baseInput({ isError }), styles.select)} ref={ref}>
      {addEmptyOption ? (
        <>
          <option value="">
            {typeof addEmptyOption === "string" ? addEmptyOption : t("select.emptyValue")}
          </option>
          <hr />
        </>
      ) : null}
      {children}
    </select>
  );
});

Select.displayName = "Select";

/**
 * Select field
 */
export default memo(Select);
