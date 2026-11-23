import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import Text from "@/components/atoms/text/Text";
import BaseBlock from "@/components/blocks/base-block/BaseBlock";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./RichText.module.css";

export type Props = ComponentPropsWithRef<"div">;

function RichText({ children, ...props }: Props) {
  return (
    <BaseBlock {...addClassNameToProps(props, styles.richText)}>
      <Text>{children}</Text>
    </BaseBlock>
  );
}

export default memo(RichText);
