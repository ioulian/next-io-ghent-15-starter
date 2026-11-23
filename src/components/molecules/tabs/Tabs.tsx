"use client";

import type { ComponentPropsWithRef } from "react";
import type { TabsProps } from "react-tabs";

import { memo } from "react";

import clsx from "clsx";
import { Tabs as ReactTabs } from "react-tabs";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Tabs.module.css";

export type Props = { tabsProps?: TabsProps } & ComponentPropsWithRef<"div">;

function Tabs({ children, tabsProps, ...props }: Props) {
  return (
    <div {...addClassNameToProps(props)}>
      <ReactTabs
        {...tabsProps}
        className={clsx(styles.tabs)}
        disabledTabClassName={tabsProps?.disabledTabClassName}
        selectedTabClassName={tabsProps?.selectedTabClassName}
        selectedTabPanelClassName={clsx(styles.tabPanelSelected, tabsProps?.selectedTabPanelClassName)}
      >
        {children}
      </ReactTabs>
    </div>
  );
}

/**
 * Wrapper around `react-tabs` with correct styling
 */
export default memo(Tabs);
