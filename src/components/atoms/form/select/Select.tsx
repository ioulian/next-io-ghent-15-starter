import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import { useTranslations } from "next-intl";

import { baseInput } from "@/components/atoms/form/base-input/BaseInput.styles";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Select.module.css";

const Select: FC<
  {
    /**
     * Add empty option as first item
     */
    addEmptyOption?: boolean | string;
    isError?: boolean;
  } & ComponentPropsWithRef<"select">
> = ({ addEmptyOption = false, children, isError, ...props }) => {
  const t = useTranslations("common.form");

  return (
    <select {...addClassNameToProps(props, baseInput({ isError }), styles.select)}>
      {addEmptyOption ? (
        <>
          <option value="">{typeof addEmptyOption === "string" ? addEmptyOption : t("select.emptyValue")}</option>
          <hr />
        </>
      ) : null}
      {children}
    </select>
  );
};

/**
 * Select field
 */
export default memo(Select);
