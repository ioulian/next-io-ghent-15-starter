import type { CompositeProps } from "@floating-ui/react";
import type { FC, HTMLAttributes, HTMLProps } from "react";

import { memo, useCallback } from "react";

import { Composite } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./MenuBar.module.css";

const MenuBar: FC<HTMLProps<HTMLElement> & CompositeProps> = ({ ...props }) => {
  const defaultRender = useCallback((props: HTMLAttributes<HTMLElement>) => <nav {...props} />, []);

  return (
    <Composite
      orientation="horizontal"
      role="menubar"
      render={defaultRender}
      {...addClassNameToProps(props, styles.menuBar)}
    />
  );
};

export default memo(MenuBar);
