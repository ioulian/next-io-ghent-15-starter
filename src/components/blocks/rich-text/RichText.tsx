import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";
import Text from "@/components/atoms/text/Text";
import BaseBlock from "@/components/blocks/base-block/BaseBlock";

import styles from "./RichText.module.css";

const RichText = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <BaseBlock {...addClassNameToProps(props, styles.richText)} ref={ref}>
        <Text>{children}</Text>
      </BaseBlock>
    );
  },
);

RichText.displayName = "RichText";

export default memo(RichText);
