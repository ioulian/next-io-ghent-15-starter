import type { CompositeProps } from "@floating-ui/react";
import type { HTMLAttributes, HTMLProps } from "react";

import { memo, useCallback } from "react";

import { Composite } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./MenuBar.module.css";

export type Props = HTMLProps<HTMLElement> & CompositeProps;

function MenuBar({ ...props }: Props) {
  const defaultRender = useCallback((props: HTMLAttributes<HTMLElement>) => <nav {...props} />, []);

  return (
    <Composite
      orientation="horizontal"
      role="menubar"
      render={defaultRender}
      {...addClassNameToProps(props, styles.menuBar)}
    />
  );
}

export default memo(MenuBar);
