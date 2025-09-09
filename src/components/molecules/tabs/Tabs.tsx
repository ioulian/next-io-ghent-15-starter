"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import clsx from "clsx";
import { Tabs as ReactTabs, TabsProps } from "react-tabs";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Tabs.module.css";

const Tabs: FC<{ tabsProps?: TabsProps } & ComponentPropsWithRef<"div">> = ({
  children,
  tabsProps,
  ...props
}) => {
  return (
    <div {...addClassNameToProps(props)}>
      <ReactTabs
        {...tabsProps}
        className={clsx(styles.tabs)}
        disabledTabClassName={tabsProps?.disabledTabClassName}
        selectedTabClassName={tabsProps?.selectedTabClassName}
        selectedTabPanelClassName={clsx(
          styles.tabPanelSelected,
          tabsProps?.selectedTabPanelClassName,
        )}
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
