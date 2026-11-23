import type { PolymorphicProps } from "@/types/helpers";
import type { ElementType } from "react";

import { memo } from "react";

import { useTranslations } from "next-intl";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Label.module.css";

export type Props<E extends ElementType = "label"> = PolymorphicProps<E, { required?: boolean }>;

function Label<E extends ElementType = "label">({ required, as, children, ...props }: Props<E>) {
  const Component: ElementType = as ?? "label";
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
}

/**
 * Label component for the form field
 */
export default memo(Label) as typeof Label;
