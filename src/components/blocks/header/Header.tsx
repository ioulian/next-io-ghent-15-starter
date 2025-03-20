import { ComponentPropsWithRef, forwardRef, memo, ReactNode, useMemo } from "react";

import { addClassNameToProps } from "@/utils/styles";
import { createSmoothShadow } from "@/components/utils/smooth-shadow/utilities";
import { presetDefault } from "@/components/utils/smooth-shadow/presets";
import { HeaderContext } from "@/components/blocks/header/Header.context";
import { WithRequired } from "@/types/helpers";

import styles from "./Header.module.css";
import stylesStickyShadow from "./../../utils/sticky-shadow/StickyShadow.module.css";
import Desktop from "./desktop/Desktop";
import Mobile from "./mobile/Mobile";

const Header = forwardRef<
  HTMLElement,
  { topMenu?: ReactNode; actions?: ReactNode } & WithRequired<
    ComponentPropsWithRef<"header">,
    "children"
  >
>(({ topMenu, actions, children, ...props }, ref) => {
  const headerStyle = useMemo(
    () => ({
      "--sticky-shadow": createSmoothShadow(presetDefault),
    }),
    [],
  );
  const contextValue = useMemo(
    () => ({
      topMenu,
      actions,
    }),
    [topMenu, actions],
  );

  return (
    <header
      {...addClassNameToProps(props, styles.header, stylesStickyShadow.stickyShadow)}
      style={headerStyle}
      ref={ref}
    >
      <HeaderContext.Provider value={contextValue}>
        <Desktop className={styles.desktop}>{children}</Desktop>
        <Mobile className={styles.mobile} />
      </HeaderContext.Provider>
    </header>
  );
});

Header.displayName = "Header";

export default memo(Header);
