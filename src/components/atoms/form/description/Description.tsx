import type { WithRequired } from "@/types/helpers";
import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { useTranslations } from "next-intl";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Description.module.css";

export type Props = WithRequired<ComponentPropsWithRef<"div">, "id">;

function Description({ id, children, ...props }: Props) {
  const t = useTranslations("common.form");

  return (
    <div {...addClassNameToProps(props, styles.description)} id={id}>
      <VisuallyHidden>{t("description.prefix")}</VisuallyHidden>
      {children}
    </div>
  );
}

/**
 * Description of the form field
 */
export default memo(Description);
