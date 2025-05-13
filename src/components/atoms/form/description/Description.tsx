import { ComponentPropsWithRef, FC, memo } from "react";

import { useTranslations } from "next-intl";

import { WithRequired } from "@/types/helpers";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Description.module.css";

const Description: FC<WithRequired<ComponentPropsWithRef<"div">, "id">> = ({
  id,
  children,
  ...props
}) => {
  const t = useTranslations("common.form");

  return (
    <div {...addClassNameToProps(props, styles.description)} id={id}>
      <VisuallyHidden>{t("description.prefix")}</VisuallyHidden>
      {children}
    </div>
  );
};

/**
 * Description of the form field
 */
export default memo(Description);
