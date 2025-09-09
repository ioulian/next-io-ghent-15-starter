import type { FC } from "react";

import { ComponentPropsWithRef, memo, ReactNode } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";
import { cardList } from "./CardList.styles";

import blockStyles from "./../Blocks.module.css";

const CardList: FC<
  {
    footer?: ReactNode;
  } & ComponentPropsWithRef<"div">
> = ({ footer, children, ...props }) => {
  const classes = cardList();

  return (
    <div {...addClassNameToProps(props, classes.base(), blockStyles.blockBase)}>
      {children ? (
        <Layout variant="threeCol" className={classes.body()}>
          {children}
        </Layout>
      ) : null}
      {footer ? (
        <Layout variant="oneCol" as="footer" className={classes.footer()}>
          <div>{footer}</div>
        </Layout>
      ) : null}
    </div>
  );
};

export default memo(CardList);
