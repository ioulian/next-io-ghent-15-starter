import type { ComponentPropsWithRef, ElementType, FC } from "react";

import { memo } from "react";

import { useTranslations } from "next-intl";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Label.module.css";

const Label: FC<
  {
    as?: ElementType;
    required?: boolean;
  } & ComponentPropsWithRef<"label">
> = ({ required, as: Component = "label", children, ...props }) => {
  const t = useTranslations("common.form");

  return (
    <Component {...addClassNameToProps(props, styles.label)}>
      {children}
      {required ? (
        <span className={styles.asterisk}>
          <abbr aria-hidden="true" title={t("label.required")}>
            *
          </abbr>
          <VisuallyHidden>{t("label.required")}</VisuallyHidden>
        </span>
      ) : null}
    </Component>
  );
};

/**
 * Label component for the form field
 */
export default memo(Label);
