import type { ComponentPropsWithRef, ReactNode } from "react";

import { memo } from "react";

import Layout from "@/components/atoms/layout/Layout";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Hero.module.css";

export type Props = { media?: ReactNode } & ComponentPropsWithRef<"div">;

function Hero({ media, children, ...props }: Props) {
  return (
    <div {...addClassNameToProps(props, styles.hero)}>
      <div className={styles.background}>{media}</div>
      <Layout variant="oneCol" className={styles.content}>
        <div>{children}</div>
      </Layout>
    </div>
  );
}

export default memo(Hero);
