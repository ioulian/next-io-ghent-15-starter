import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import Text from "@/components/atoms/text/Text";
import BaseBlock from "@/components/blocks/base-block/BaseBlock";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./RichText.module.css";

const RichText: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  return (
    <BaseBlock {...addClassNameToProps(props, styles.richText)}>
      <Text>{children}</Text>
    </BaseBlock>
  );
};

export default memo(RichText);
