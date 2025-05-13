import { ComponentPropsWithRef, memo } from "react";

import { useTranslations } from "next-intl";
import { PolymorphicComponent } from "react-polymorphed";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Label.module.css";

const Label: PolymorphicComponent<
  "label",
  {
    required?: boolean;
  } & ComponentPropsWithRef<"label">
> = ({ required, as: Component = "label", children, ...props }) => {
  const t = useTranslations("common.form");

  return (
    <Component {...addClassNameToProps(props, styles.label)}>
      {children}
      {required ? (
        <span aria-hidden="true" title={t("label.required")} className={styles.asterisk}>
          *
        </span>
      ) : null}
    </Component>
  );
};

/**
 * Label component for the form field
 */
export default memo(Label);
