"use client";

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

import {
  Side,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useRole,
} from "@floating-ui/react";

export interface DialogOptions {
  initialOpen?: boolean;
  open?: boolean;
  sheetSide?: Side;
  onOpenChange?: (open: boolean) => void;
}

export const useDialog = ({
  initialOpen = false,
  open: controlledOpen,
  sheetSide = "right",
  onOpenChange: setControlledOpen,
}: DialogOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const nodeId = useFloatingNodeId();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    nodeId,
    open,
    placement: sheetSide,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: typeof controlledOpen === "undefined",
  });
  const dismiss = useDismiss(context, {
    outsidePressEvent: "pointerdown",
  });
  const role = useRole(context);

  const interactions = useInteractions([click, role, dismiss]);

  return useMemo(
    () => ({
      nodeId,
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, nodeId, data, labelId, descriptionId],
  );
};

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const DialogContext = createContext<ContextType>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error("Dialog components must be wrapped in <Dialog />");
  }

  return context;
};
