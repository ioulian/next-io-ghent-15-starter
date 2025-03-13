import { Composite, CompositeProps } from "@floating-ui/react";
import { forwardRef, HTMLAttributes, HTMLProps, memo, useCallback } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./MenuBar.module.css";

const MenuBar = forwardRef<HTMLElement, HTMLProps<HTMLElement> & CompositeProps>(
  ({ ...props }, ref) => {
    const defaultRender = useCallback(
      (props: HTMLAttributes<HTMLElement>) => <nav {...props} />,
      [],
    );

    return (
      <Composite
        orientation="horizontal"
        role="menubar"
        render={defaultRender}
        {...addClassNameToProps(props, styles.menuBar)}
        ref={ref}
      />
    );
  },
);

MenuBar.displayName = "MenuBar";

export default memo(MenuBar);
