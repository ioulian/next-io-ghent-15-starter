import type { ComponentPropsWithRef, ReactNode } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";
import { cardList } from "./CardList.styles";

import blockStyles from "./../Blocks.module.css";

export type Props = {
  footer?: ReactNode;
} & ComponentPropsWithRef<"div">;

function CardList({ footer, children, ...props }: Props) {
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
}

export default memo(CardList);
