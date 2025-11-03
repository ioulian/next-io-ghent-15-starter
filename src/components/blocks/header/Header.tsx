import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode, useMemo } from "react";

import { WithRequired } from "@/types/helpers";

import { HeaderContext } from "@/components/blocks/header/Header.context";
import { presetDefault } from "@/components/utils/smooth-shadow/presets";
import { createSmoothShadow } from "@/components/utils/smooth-shadow/utilities";
import { addClassNameToProps } from "@/utils/styles";

import Desktop from "./desktop/Desktop";
import Mobile from "./mobile/Mobile";

import stylesStickyShadow from "./../../utils/sticky-shadow/StickyShadow.module.css";
import styles from "./Header.module.css";

const Header: FC<
  { topMenu?: ReactNode; actions?: ReactNode } & WithRequired<ComponentPropsWithRef<"header">, "children">
> = ({ topMenu, actions, children, ...props }) => {
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
    <header {...addClassNameToProps(props, styles.header, stylesStickyShadow.stickyShadow)} style={headerStyle}>
      <HeaderContext value={contextValue}>
        <Desktop className={styles.desktop}>{children}</Desktop>
        <Mobile className={styles.mobile} />
      </HeaderContext>
    </header>
  );
};

export default memo(Header);
