import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode } from "react";

import Layout from "@/components/atoms/layout/Layout";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Hero.module.css";

const Hero: FC<{ media?: ReactNode } & ComponentPropsWithRef<"div">> = ({ media, children, ...props }) => {
  return (
    <div {...addClassNameToProps(props, styles.hero)}>
      <div className={styles.background}>{media}</div>
      <Layout variant="oneCol" className={styles.content}>
        <div>{children}</div>
      </Layout>
    </div>
  );
};

export default memo(Hero);
