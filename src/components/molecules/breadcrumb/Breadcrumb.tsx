import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  forwardRef,
  isValidElement,
  memo,
} from "react";
import { useTranslations } from "next-intl";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Breadcrumb.module.css";

const Breadcrumb = forwardRef<HTMLCanvasElement, ComponentPropsWithRef<"nav">>(
  ({ children, ...props }, ref) => {
    const t = useTranslations("common");

    return (
      <nav
        aria-label={t("breadcrumb.label")}
        {...addClassNameToProps(props, styles.breadcrumb)}
        ref={ref}
      >
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
  },
);

Breadcrumb.displayName = "Breadcrumb";

/**
 * Breadcrumb component, just render some links in it, it will handle the separation of them
 */
export default memo(Breadcrumb);
