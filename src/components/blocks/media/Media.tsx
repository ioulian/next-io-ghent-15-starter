import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import BaseBlock from "@/components/blocks/base-block/BaseBlock";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./Media.module.css";

export type Props = ComponentPropsWithRef<"div">;

function Media({ children, ...props }: Props) {
  return <BaseBlock {...addClassNameToProps(props, styles.media)}>{children}</BaseBlock>;
}

export default memo(Media);
