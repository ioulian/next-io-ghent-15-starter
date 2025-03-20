import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";
import BaseBlock from "@/components/blocks/base-block/BaseBlock";

import styles from "./Media.module.css";

const Media = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <BaseBlock {...addClassNameToProps(props, styles.media)} ref={ref}>
        {children}
      </BaseBlock>
    );
  },
);

Media.displayName = "Media";

export default memo(Media);
