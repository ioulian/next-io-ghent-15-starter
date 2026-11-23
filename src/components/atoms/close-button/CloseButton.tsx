import type Button from "@/components/atoms/button/Button";
import type { ComponentPropsWithRef } from "react";

import { memo } from "react";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./CloseButton.module.css";

export type Props = { children: string } & Omit<ComponentPropsWithRef<typeof Button>, "children">;

function CloseButton({ children, ...props }: Props) {
  return (
    <button type="button" {...addClassNameToProps(props, styles.closeButton)} aria-label={children} title={children}>
      <SvgSprite name="tablerX" />
    </button>
  );
}

/**
 * Close button to be used inside <Floater> used by floating-ui
 */
export default memo(CloseButton);
