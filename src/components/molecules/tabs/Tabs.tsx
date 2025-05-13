"use client";

import { ComponentPropsWithRef, forwardRef, memo } from "react";

import clsx from "clsx";
import { Tabs as ReactTabs, TabsProps } from "react-tabs";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Tabs.module.css";

const Tabs = forwardRef<HTMLDivElement, { tabsProps?: TabsProps } & ComponentPropsWithRef<"div">>(
  ({ children, tabsProps, ...props }, ref) => {
    return (
      <div {...addClassNameToProps(props)} ref={ref}>
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
  },
);

Tabs.displayName = "Tabs";

/**
 * Wrapper around `react-tabs` with correct styling
 */
export default memo(Tabs);
