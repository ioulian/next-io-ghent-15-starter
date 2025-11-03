"use client";

import type { FC } from "react";

import { Fragment, HTMLProps, memo, useCallback, useMemo } from "react";

import {
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  useFloatingParentNodeId,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import { useTranslations } from "next-intl";

import CloseButton from "@/components/atoms/close-button/CloseButton";
import Floater from "@/components/atoms/floater/Floater";
import { zoomAnimation } from "@/components/atoms/floater/Floater.animations";

import { usePopoverContext } from "./hooks";

const PopoverContent: FC<{ withCloseButton?: boolean; showArrow?: boolean } & HTMLProps<HTMLDivElement>> = ({
  withCloseButton = false,
  showArrow,
  ref: propRef,
  ...props
}) => {
  const t = useTranslations("common.closeButton");
  const context = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const parentId = useFloatingParentNodeId();
  const { isMounted, styles } = useTransitionStyles(context.context, zoomAnimation);
  const onClick = useCallback(() => {
    context.setOpen(false);
  }, [context]);

  const position = useMemo(() => ({ x: context.x ?? 0, y: context.y ?? 0 }), [context.x, context.y]);

  if (!isMounted) {
    return null;
  }

  const Wrapper = parentId === null ? FloatingTree : Fragment;

  return (
    <Wrapper>
      <FloatingNode id={context.nodeId}>
        <FloatingPortal>
          <FloatingFocusManager context={context.context} modal={context.modal}>
            <Floater
              ref={ref}
              position={position}
              arrowPosition={context.middlewareData.arrow}
              strategy={context.strategy}
              placement={context.placement}
              arrowCallback={context.arrowCallback}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
              showArrow={showArrow}
              style={styles}
            >
              {props.children}
              {withCloseButton ? <CloseButton onClick={onClick}>{t("defaultLabel")}</CloseButton> : null}
            </Floater>
          </FloatingFocusManager>
        </FloatingPortal>
      </FloatingNode>
    </Wrapper>
  );
};

export default memo(PopoverContent);
