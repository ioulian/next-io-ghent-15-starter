import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import styles from "./BaseBlock.module.css";
import blockStyles from "./../Blocks.module.css";

const BaseBlock = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <div {...addClassNameToProps(props, styles.baseBlock, blockStyles.blockBase)} ref={ref}>
        <Layout variant="oneCol">{children}</Layout>
      </div>
    );
  },
);

BaseBlock.displayName = "BaseBlock";

export default memo(BaseBlock);
