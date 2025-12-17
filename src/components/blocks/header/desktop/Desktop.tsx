import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import Layout from "@/components/atoms/layout/Layout";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import LocaleSwitcher from "@/components/molecules/locale-switcher/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { addClassNameToProps } from "@/utils/styles";

import { useActions, useTopMenuItems } from "../Desktop.hooks";

import styles from "./Desktop.module.css";

const Desktop: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  const topMenuItems = useTopMenuItems();
  const actions = useActions();

  return (
    <div {...addClassNameToProps(props, styles.desktop)}>
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
              <SvgSprite name="logo" />
            </Link>
            <div className={styles.mainNav}>{children}</div>
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default memo(Desktop);
