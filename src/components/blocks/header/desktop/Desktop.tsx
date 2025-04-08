import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";
import Layout from "@/components/atoms/layout/Layout";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import LocaleSwitcher from "@/components/molecules/locale-switcher/LocaleSwitcher";
import { Link } from "@/i18n/navigation";

import { useActions, useTopMenuItems } from "../Desktop.hooks";

import logoSprite from "./../../../../../public/img/logo-sprite.svg";
import styles from "./Desktop.module.css";

const Desktop = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    const topMenuItems = useTopMenuItems();
    const actions = useActions();

    return (
      <div {...addClassNameToProps(props, styles.desktop)} ref={ref}>
        <div className={styles.topMenu}>
          <Layout variant="oneCol">
            <div className={styles.topMenuInner}>
              {topMenuItems ? <nav className={styles.topMenuItems}>{topMenuItems}</nav> : null}
              <LocaleSwitcher />
            </div>
          </Layout>
        </div>
        <div className={styles.mainMenu}>
          <Layout variant="oneCol">
            <div className={styles.mainMenuInner}>
              <Link href="/" className={styles.logo}>
                <SvgSprite src={logoSprite} />
              </Link>
              <div className={styles.mainNav}>{children}</div>
              {actions ? <div className={styles.actions}>{actions}</div> : null}
            </div>
          </Layout>
        </div>
      </div>
    );
  },
);

Desktop.displayName = "Desktop";

export default memo(Desktop);
