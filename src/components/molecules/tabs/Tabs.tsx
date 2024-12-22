"use client";

import { ComponentPropsWithRef, FC, memo } from "react";
import { Tabs as ReactTabs } from "react-tabs";
import clsx from "clsx";

import styles from "./Tabs.module.css";

const Tabs: FC<ComponentPropsWithRef<typeof ReactTabs>> = ({
  children,
  className,
  disabledTabClassName,
  selectedTabClassName,
  selectedTabPanelClassName,
  ...props
}) => {
  return (
    <div>
      <ReactTabs
        {...props}
        className={clsx(styles.tabs, typeof className === "string" ? className : undefined)}
        disabledTabClassName={disabledTabClassName}
        selectedTabClassName={selectedTabClassName}
        selectedTabPanelClassName={clsx(styles.tabPanelSelected, selectedTabPanelClassName)}
      >
        {children}
      </ReactTabs>
    </div>
  );
};

/**
 * Wrapper around `react-tabs` with correct styling
 */
export default memo(Tabs);
