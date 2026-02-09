import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import blockStyles from "./../Blocks.module.css";
import styles from "./BaseBlock.module.css";

const BaseBlock: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  return (
    <div {...addClassNameToProps(props, styles.baseBlock, blockStyles.blockBase)}>
      <Layout variant="oneCol">{children}</Layout>
    </div>
  );
};

export default memo(BaseBlock);
