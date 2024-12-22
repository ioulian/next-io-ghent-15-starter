"use client";

import { FC, memo } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import styles from "./Pagination.module.css";

const Pagination: FC<ReactPaginateProps> = (props) => {
  const t = useTranslations("common.pagination");

  return (
    <div role="navigation">
      <ReactPaginate
        {...{
          ...props,
          breakAriaLabels: {
            backward: t("aria.break.backward"),
            forward: t("aria.break.forward"),
          },
          ariaLabelBuilder: (page) => t("aria.page", { page }),
          previousAriaLabel: t("aria.previous"),
          nextAriaLabel: t("aria.next"),
          className: clsx(styles.pagination, props.className),
          pageClassName: clsx(styles.page, props.pageClassName),
          pageLinkClassName: clsx(styles.pageLink, props.pageLinkClassName),
          disabledClassName: clsx(styles.disabled, props.disabledClassName),
          nextLinkClassName: clsx(styles.pageLink, props.nextLinkClassName),
          previousLinkClassName: clsx(styles.pageLink, props.previousLinkClassName),
          breakLinkClassName: clsx(styles.pageLink, props.breakLinkClassName),
          activeClassName: clsx(styles.pageSelected, props.activeClassName),
        }}
      />
    </div>
  );
};

/**
 * Pagination wrapper around `react-paginate`, providing correct translations and styling.
 */
export default memo(Pagination);
