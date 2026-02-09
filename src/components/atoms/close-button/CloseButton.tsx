import type { WithRequired } from "@/types/helpers";
import type { ComponentPropsWithRef, FC } from "react";

import { memo } from "react";

import Button from "@/components/atoms/button/Button";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import styles from "./CloseButton.module.css";

const CloseButton: FC<WithRequired<ComponentPropsWithRef<typeof Button>, "children">> = (props) => {
  return (
    <Button
      {...addClassNameToProps(props, styles.closeButton)}
      iconOnly
      iconBefore={<SvgSprite name="tablerX" />}
      size="base"
      variant="simple"
    />
  );
};

/**
 * Close button to be used inside <Floater> used by floating-ui
 */
export default memo(CloseButton);
