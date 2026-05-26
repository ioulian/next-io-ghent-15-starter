import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { useTranslations } from "next-intl";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./FieldError.module.css";

const FieldError: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  const t = useTranslations("common.form");

  return (
    <div {...addClassNameToProps(props, styles.error)} role="alert">
      <VisuallyHidden>{t("error.prefix")}</VisuallyHidden>
      {children}
    </div>
  );
};

/**
 * Error message for the form field
 */
export default memo(FieldError);
