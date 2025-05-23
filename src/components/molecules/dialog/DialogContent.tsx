"use client";

import {
  forwardRef,
  Fragment,
  HTMLProps,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  useFloatingParentNodeId,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import CloseButton from "@/components/atoms/close-button/CloseButton";
import Floater from "@/components/atoms/floater/Floater";
import Sheet from "@/components/atoms/sheet/Sheet";

import { overlay } from "./Dialog.styles";
import { useDialogContext } from "./hooks";

const DialogContent = forwardRef<
  HTMLDivElement,
  { withCloseButton?: boolean; asSheet?: boolean } & HTMLProps<HTMLDivElement>
>(({ withCloseButton, asSheet = false, className, ...props }, propRef) => {
  const t = useTranslations("common.closeButton");
  const context = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const parentId = useFloatingParentNodeId();
  const { isMounted, styles } = useTransitionStyles(context.context, {
    duration: {
      open: getVariableAsNumber("duration.normal"),
      close: getVariableAsNumber("duration.fast"),
    },
  });

  const { styles: stylesSheet } = useTransitionStyles(context.context, {
    duration: {
      open: getVariableAsNumber("duration.normal"),
      close: getVariableAsNumber("duration.fast"),
    },
    initial: ({ side }) => {
      let transform: string | undefined;
      if (side === "top") {
        transform = "translate3d(0, -100%, 0)";
      }

      if (side === "bottom") {
        transform = "translate3d(0, 100%, 0)";
      }

      if (side === "left") {
        transform = "translate3d(-100%, 0, 0)";
      }

      if (side === "right") {
        transform = "translate3d(100%, 0, 0)";
      }

      return {
        transform,
      };
    },
  });

  const onClick = useCallback(() => {
    context.setOpen(false);
  }, [context]);

  const style = useMemo(
    () => ({ ...styles, overflow: asSheet ? "hidden" : "auto" }),
    [styles, asSheet],
  );

  // This will disable focus manager during animation thus preventing focussing items outside the viewport
  const [focusDisabled, setFocusDisabled] = useState<boolean>(true);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (isMounted) {
      timeout = setTimeout(() => {
        setFocusDisabled(false);
      }, getVariableAsNumber("duration.normal"));
    } else {
      setFocusDisabled(true);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isMounted, asSheet]);

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
            className={clsx(overlay({ asSheet }), className)}
            style={style}
          >
            <FloatingFocusManager context={context.context} modal disabled={focusDisabled}>
              {asSheet ? (
                <Sheet
                  ref={ref}
                  placement={context.placement}
                  aria-labelledby={context.labelId}
                  aria-describedby={context.descriptionId}
                  {...context.getFloatingProps(props)}
                  style={stylesSheet}
                >
                  {props.children}
                  {withCloseButton ? (
                    <CloseButton onClick={onClick}>{t("defaultLabel")}</CloseButton>
                  ) : null}
                </Sheet>
              ) : (
                <Floater
                  ref={ref}
                  placement={context.placement}
                  aria-labelledby={context.labelId}
                  aria-describedby={context.descriptionId}
                  {...context.getFloatingProps(props)}
                >
                  {props.children}
                  {withCloseButton ? (
                    <CloseButton onClick={onClick}>{t("defaultLabel")}</CloseButton>
                  ) : null}
                </Floater>
              )}
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      </FloatingNode>
    </Wrapper>
  );
});

DialogContent.displayName = "DialogContent";

export default memo(DialogContent);
