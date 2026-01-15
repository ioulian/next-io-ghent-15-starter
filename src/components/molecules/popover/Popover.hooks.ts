"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useRole,
} from "@floating-ui/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const usePopover = ({
  initialOpen = false,
  placement = "bottom",
  modal = true,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const nodeId = useFloatingNodeId();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const data = useFloating({
    nodeId,
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(getVariableAsNumber("popover.offset")),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: getVariableAsNumber("floater.flip"),
      }),
      shift({ padding: getVariableAsNumber("floater.shift") }),
      // eslint-disable-next-line react-hooks/refs
      arrow({
        element: arrowRef,
        padding: getVariableAsNumber("floater.arrow.padding"),
      }),
    ],
  });
  const arrowCallback = useCallback(
    (node: HTMLDivElement | null) => {
      arrowRef.current = node;
      data.update();
    },
    [data],
  );

  const context = data.context;

  const click = useClick(context, {
    enabled: typeof controlledOpen === "undefined",
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      nodeId,
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      arrowCallback,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [nodeId, open, setOpen, interactions, arrowCallback, data, modal, labelId, descriptionId],
  );
};

type ContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (context === null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};
