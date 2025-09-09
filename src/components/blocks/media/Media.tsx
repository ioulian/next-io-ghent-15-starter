import type { FC } from "react";

import { ComponentPropsWithRef, memo } from "react";

import BaseBlock from "@/components/blocks/base-block/BaseBlock";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Media.module.css";

const Media: FC<ComponentPropsWithRef<"div">> = ({ children, ...props }) => {
  return <BaseBlock {...addClassNameToProps(props, styles.media)}>{children}</BaseBlock>;
};

export default memo(Media);
