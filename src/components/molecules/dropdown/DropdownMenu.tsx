"use client";

import {
  FocusEvent,
  forwardRef,
  HTMLProps,
  memo,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  arrow,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStyles,
  useTypeahead,
} from "@floating-ui/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Floater from "@/components/atoms/floater/Floater";

import { DropdownMenuProps, MenuContext, WithTypeAheadKey } from "./Dropdown";
import DropdownTrigger from "./DropdownTrigger";

import styles from "./Dropdown.module.css";

const DropdownMenu = forwardRef<
  HTMLButtonElement,
  DropdownMenuProps & WithTypeAheadKey & HTMLProps<HTMLButtonElement>
>(({ children, trigger, onFocus, onMouseEnter, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [allowHover, setAllowHover] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasFocusInside, setHasFocusInside] = useState<boolean>(false);

  const elementsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const parent = useContext(MenuContext);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId !== null;

  const { x, y, refs, context, update, strategy, placement, middlewareData } =
    useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? "right-start" : "bottom-start",
      middleware: [
        offset({
          mainAxis: getVariableAsNumber("dropdown.offset"),
          alignmentAxis: getVariableAsNumber("dropdown.offset"),
        }),
        flip(),
        shift({ padding: getVariableAsNumber("floater.shift") }),
        arrow({
          element: arrowRef,
          padding: getVariableAsNumber("floater.arrow.padding"),
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

  const arrowCallback = useCallback(
    (node: HTMLDivElement | null) => {
      arrowRef.current = node;
      update();
    },
    [update],
  );

  const hover = useHover(context, {
    handleClose: safePolygon({ blockPointerEvents: true }),
    enabled: isNested && allowHover,
    delay: { open: 75 },
  });
  const click = useClick(context, {
    toggle: !isNested || !allowHover,
    event: "mousedown",
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
    orientation: "vertical",
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    hover,
    click,
    role,
    dismiss,
    listNavigation,
    typeahead,
  ]);

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  useEffect(() => {
    if (!tree) {
      return;
    }

    const handleTreeClick = () => {
      setIsOpen(false);
    };

    const onSubMenuOpen = (event: { nodeId: string; parentId: string }) => {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    };

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  useEffect(() => {
    function onPointerMove({ pointerType }: PointerEvent) {
      if (pointerType !== "touch") {
        // False positive
        // eslint-disable-next-line react-you-might-not-need-an-effect/you-might-not-need-an-effect
        setAllowHover(true);
      }
    }

    function onKeyDown() {
      // False positive
      // eslint-disable-next-line react-you-might-not-need-an-effect/you-might-not-need-an-effect
      setAllowHover(false);
    }

    window.addEventListener("pointermove", onPointerMove, {
      once: true,
      capture: true,
    });
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("pointermove", onPointerMove, {
        capture: true,
      });
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [allowHover]);

  const { isMounted, styles: floaterStyles } = useTransitionStyles(context, {
    duration: {
      open: getVariableAsNumber("duration.normal"),
      close: getVariableAsNumber("duration.fast"),
    },
  });

  const contextValue = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      getItemProps,
      setHasFocusInside,
      isOpen,
      allowHover,
      setIsOpen,
      parent,
    }),
    [activeIndex, setActiveIndex, getItemProps, setHasFocusInside, isOpen, allowHover, parent],
  );

  const position = useMemo(() => ({ x, y }), [x, y]);

  const onFocusCallback = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      setHasFocusInside(false);
      parent.setHasFocusInside(true);
    },
    [onFocus, parent],
  );

  const onMouseEnterCallback = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(event);
      if (parent.allowHover && parent.isOpen) {
        parent.setActiveIndex(item.index);
      }
    },
    [onMouseEnter, item.index, parent],
  );

  return (
    <FloatingNode id={nodeId!}>
      <DropdownTrigger
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        // eslint-disable-next-line sonarjs/no-nested-conditional
        tabIndex={!isNested ? undefined : parent.activeIndex === item.index ? 0 : -1}
        role={isNested ? "menuitem" : undefined}
        data-open={isOpen ? "" : undefined}
        data-nested={isNested ? "" : undefined}
        data-focus-inside={hasFocusInside ? "" : undefined}
        {...getReferenceProps(
          parent.getItemProps({
            ...props,
            onFocus: onFocusCallback,
            onMouseEnter: onMouseEnterCallback,
          }),
        )}
      >
        {trigger}
      </DropdownTrigger>
      <MenuContext value={contextValue}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {isMounted ? (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
              >
                <Floater
                  ref={refs.setFloating}
                  position={position}
                  arrowPosition={middlewareData.arrow}
                  strategy={strategy}
                  placement={placement}
                  arrowCallback={arrowCallback}
                  {...getFloatingProps()}
                  style={floaterStyles}
                >
                  <div className={styles.menuWrapper}>{children}</div>
                </Floater>
              </FloatingFocusManager>
            </FloatingPortal>
          ) : null}
        </FloatingList>
      </MenuContext>
    </FloatingNode>
  );
});

DropdownMenu.displayName = "DropdownMenu";

export default memo(DropdownMenu);
