import { ComponentPropsWithRef, forwardRef, memo, ReactNode } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import { cardList } from "./CardList.styles";

const CardList = forwardRef<
  HTMLDivElement,
  {
    footer?: ReactNode;
  } & ComponentPropsWithRef<"div">
>(({ footer, children, ...props }, ref) => {
  const classes = cardList();

  return (
    <div {...addClassNameToProps(props, classes.base())} ref={ref}>
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
});

CardList.displayName = "CardList";

export default memo(CardList);
