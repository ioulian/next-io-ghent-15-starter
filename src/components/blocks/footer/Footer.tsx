import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode } from "react";

import { useTranslations } from "next-intl";

import Text from "@/components/atoms/text/Text";
import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import styles from "./Footer.module.css";

const Footer: FC<{ showCreatedBy?: boolean; metaNav: ReactNode; siteName: string } & ComponentPropsWithRef<"div">> = ({
  showCreatedBy,
  metaNav,
  siteName,
  children,
  ...props
}) => {
  const t = useTranslations("common.footer");
  const year = new Date().getFullYear();

  return (
    <footer {...addClassNameToProps(props, styles.footer)}>
      <Layout>
        <Text>{children}</Text>
      </Layout>
      <div className={styles.meta}>
        <Layout variant="oneCol">
          <div className={styles.metaContainer}>
            <div>
              &copy; {year} {siteName}
            </div>
            {metaNav ? <nav>{metaNav}</nav> : null}
            {showCreatedBy ? <div>{t("meta.createdBy")}</div> : null}
          </div>
        </Layout>
      </div>
    </footer>
  );
};

export default memo(Footer);
