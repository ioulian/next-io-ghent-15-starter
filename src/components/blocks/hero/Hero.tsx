import { ComponentPropsWithRef, forwardRef, memo, ReactNode } from "react";

import { addClassNameToProps } from "@/utils/styles";
import Layout from "@/components/atoms/layout/Layout";

import styles from "./Hero.module.css";

const Hero = forwardRef<HTMLDivElement, { media?: ReactNode } & ComponentPropsWithRef<"div">>(
  ({ media, children, ...props }, ref) => {
    return (
      <div {...addClassNameToProps(props, styles.hero)} ref={ref}>
        <div className={styles.background}>{media}</div>
        <Layout variant="oneCol" className={styles.content}>
          <div>{children}</div>
        </Layout>
      </div>
    );
  },
);

Hero.displayName = "Hero";

export default memo(Hero);
