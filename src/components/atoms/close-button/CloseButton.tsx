import { ComponentPropsWithRef, FC, memo } from "react";
import iconX from "@tabler/icons/outline/x.svg";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";
import Button from "@/components/atoms/button/Button";

import styles from "./CloseButton.module.css";

const CloseButton: FC<ComponentPropsWithRef<typeof Button>> = (props) => {
  return (
    <Button
      {...addClassNameToProps(props, styles.closeButton)}
      iconOnly
      iconBefore={<SvgSprite src={iconX} />}
      size="base"
      variant="simple"
    />
  );
};

/**
 * Close button to be used inside <Floater> used by floating-ui
 */
export default memo(CloseButton);
