import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import blockStyles from "./../Blocks.module.css";
import styles from "./BaseBlock.module.css";

export type Props = ComponentPropsWithRef<"div">;

function BaseBlock({ children, ...props }: Props) {
  return (
    <div {...addClassNameToProps(props, styles.baseBlock, blockStyles.blockBase)}>
      <Layout variant="oneCol">{children}</Layout>
    </div>
  );
}

export default memo(BaseBlock);
