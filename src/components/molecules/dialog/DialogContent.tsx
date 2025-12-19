"use client";

import type { Placement } from "@floating-ui/react";
import type { ComponentPropsWithRef, FC } from "react";
import type { VariantProps } from "tailwind-variants";

import { Fragment, HTMLProps, memo, useCallback, useEffect, useState } from "react";

import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  useFloatingParentNodeId,
  useMergeRefs,
  useTransitionStyles,
  UseTransitionStylesProps,
} from "@floating-ui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import CloseButton from "@/components/atoms/close-button/CloseButton";
import Floater from "@/components/atoms/floater/Floater";
import { dialogAnimation, dialogOverlayAnimation } from "@/components/atoms/floater/Floater.animations";

import { overlay } from "./Dialog.styles";
import { useDialogContext } from "./hooks";

export type DialogContentWrapperProps = FC<ComponentPropsWithRef<"div"> & { placement: Placement }>;

const DialogContent: FC<
  {
    withCloseButton?: boolean;
    wrapper?: DialogContentWrapperProps;
    animation?: UseTransitionStylesProps;
    overlayRendering?: VariantProps<typeof overlay>["rendering"];
  } & HTMLProps<HTMLDivElement>
> = ({
  withCloseButton,
  ref: propRef,
  className,
  overlayRendering = "centerDialog",
  wrapper: DialogContentWrapper = Floater,
  animation = dialogAnimation,
  ...props
}) => {
  const t = useTranslations("common.closeButton");
  const context = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const parentId = useFloatingParentNodeId();
  const { isMounted, styles } = useTransitionStyles(context.context, animation);
  const { styles: overlayStyles } = useTransitionStyles(context.context, dialogOverlayAnimation);

  const onClick = useCallback(() => {
    context.setOpen(false);
  }, [context]);

  // This will disable focus manager during animation thus preventing focussing items outside the viewport
  const [focusDisabled, setFocusDisabled] = useState<boolean>(true);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (isMounted) {
      timeout = setTimeout(() => {
        setFocusDisabled(false);
      }, getVariableAsNumber("duration.normal"));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFocusDisabled(true);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  const Wrapper = parentId === null ? FloatingTree : Fragment;

  return (
    <Wrapper>
      <FloatingNode id={context.nodeId}>
        <FloatingPortal>
          <FloatingOverlay
            lockScroll
            className={clsx(overlay({ rendering: overlayRendering }), className)}
            style={overlayStyles}
          >
            <FloatingFocusManager context={context.context} modal disabled={focusDisabled}>
              <DialogContentWrapper
                ref={ref}
                placement={context.placement}
                aria-labelledby={context.labelId}
                aria-describedby={context.descriptionId}
                {...context.getFloatingProps(props)}
                style={styles}
              >
                {props.children}
                {withCloseButton ? <CloseButton onClick={onClick}>{t("defaultLabel")}</CloseButton> : null}
              </DialogContentWrapper>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      </FloatingNode>
    </Wrapper>
  );
};

export default memo(DialogContent);
