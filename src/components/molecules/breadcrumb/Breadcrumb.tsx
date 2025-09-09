import type { FC } from "react";

import { Children, cloneElement, ComponentPropsWithRef, isValidElement, memo } from "react";

import { useTranslations } from "next-intl";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Breadcrumb.module.css";

const Breadcrumb: FC<ComponentPropsWithRef<"nav">> = ({ children, ...props }) => {
  const t = useTranslations("common");

  return (
    <nav {...addClassNameToProps(props, styles.breadcrumb)} aria-label={t("breadcrumb.label")}>
      <ol role="list">
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) {
            return null;
          }

          const isCurrent = !Array.isArray(children) || i === children?.length - 1;

          return (
            <li key={i} className={styles.breadcrumbItem}>
              {cloneElement(child, {
                ...(child.props ?? {}),
                ...(isCurrent ? { "aria-current": "page" } : {}),
              })}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Breadcrumb component, just render some links in it, it will handle the separation of them
 */
export default memo(Breadcrumb);
