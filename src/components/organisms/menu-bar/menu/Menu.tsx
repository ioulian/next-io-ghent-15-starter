import {
  autoUpdate,
  CompositeItem,
  CompositeItemProps,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  limitShift,
  offset,
  safePolygon,
  shift,
  size,
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
  useTypeahead,
} from "@floating-ui/react";
import {
  forwardRef,
  HTMLProps,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  FocusEvent,
  MouseEvent,
} from "react";

import { MenuProps } from "../MenuBar.types";
import { MenuContext } from "../MenuBar.context";

const MENU_PORTAL_ROOT = "menu-root";
const MENU_FLOATER = "floater";

export const MenuComponent = forwardRef<
  HTMLButtonElement,
  MenuProps & HTMLProps<HTMLButtonElement>
>(
  (
    { children, label, keepMounted = false, cols, orientation: orientationOption, ...props },
    forwardedRef,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [allowHover, setAllowHover] = useState<boolean>(false);
    const [hasFocusInside, setHasFocusInside] = useState<boolean>(false);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const isRoot = parentId === null;
    const orientation = orientationOption ?? (cols ? "both" : "vertical");

    const parent = useContext(MenuContext);
    const item = useListItem();

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: !isRoot ? "right-start" : "bottom-start",
      middleware: [
        offset(({ rects }) => {
          if (!isRoot) {
            const root = document
              .querySelector('[data-floater-root="true"]')
              ?.getBoundingClientRect();

            return {
              crossAxis: (root?.y ?? 0) - rects.reference.y,
            };
          }

          return 0;
        }),
        shift((state) => {
          const menuRoot = document.getElementById(MENU_PORTAL_ROOT);

          if (menuRoot) {
            const floaters = Array.from(
              menuRoot.querySelectorAll(`.${MENU_FLOATER}`),
            ) as HTMLElement[];
            const totalWith = floaters.reduce(
              (total, floater, i) => total + (i !== 0 ? floater.getBoundingClientRect().width : 0),
              0,
            );

            // TODO: dont work with hovers but clicks?
            return {
              padding: { right: totalWith },
            };
          }

          return 0;
        }),
        size({
          apply({ availableHeight, availableWidth, elements }) {
            const menuRoot = document.getElementById(MENU_PORTAL_ROOT);

            if (menuRoot) {
              const floaters = Array.from(
                menuRoot.querySelectorAll(`.${MENU_FLOATER}`),
              ) as HTMLElement[];
              const maxHeight = Math.max(
                ...floaters.map((el) => el.getBoundingClientRect().height),
              );
              elements.floating.style.height = `${maxHeight}px`;
            }
          },
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: allowHover,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(context, {
      event: "mousedown",
      toggle: isRoot || !allowHover,
      ignoreMouse: !isRoot,
    });
    const role = useRole(context, { role: "menu" });
    const dismiss = useDismiss(context, { bubbles: true });
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: !isRoot,
      onNavigate: setActiveIndex,
      orientation,
      cols,
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

      function handleTreeClick() {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

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
          setAllowHover(true);
        }
      }

      function onKeyDown() {
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

    return (
      <FloatingNode id={nodeId}>
        <button
          type="button"
          ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
          data-open={isOpen ? "" : undefined}
          tabIndex={isRoot ? props.tabIndex : parent.activeIndex === item.index ? 0 : -1}
          {...getReferenceProps(
            parent.getItemProps({
              ...props,
              onFocus(event: FocusEvent<HTMLButtonElement>) {
                props.onFocus?.(event);
                setHasFocusInside(false);
                parent.setHasFocusInside(true);
              },
              onMouseEnter(event: MouseEvent<HTMLButtonElement>) {
                props.onMouseEnter?.(event);
                if (parent.allowHover && parent.isOpen) {
                  parent.setActiveIndex(item.index);
                }
              },
            }),
          )}
        >
          {label}
          {!isRoot ? "icon" : null}
        </button>
        <MenuContext.Provider
          value={{
            activeIndex,
            setActiveIndex,
            getItemProps,
            setHasFocusInside,
            allowHover,
            isOpen,
            setIsOpen,
            parent,
          }}
        >
          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {keepMounted || isOpen ? (
              <FloatingPortal
                id={parentId ?? MENU_PORTAL_ROOT}
                root={parentId === null ? undefined : document.getElementById(MENU_PORTAL_ROOT)}
              >
                <FloatingFocusManager
                  context={context}
                  modal={false}
                  initialFocus={!isRoot ? -1 : 0}
                  returnFocus={isRoot}
                >
                  <div
                    className={MENU_FLOATER}
                    data-floater-root={parentId === null}
                    ref={refs.setFloating}
                    style={{
                      ...floatingStyles,
                      // @ts-ignore
                      "--cols": cols,
                      visibility: !keepMounted ? undefined : isOpen ? "visible" : "hidden",
                      border: "1px solid red",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    aria-hidden={!isOpen}
                    {...getFloatingProps()}
                  >
                    {children}
                  </div>
                </FloatingFocusManager>
              </FloatingPortal>
            ) : null}
          </FloatingList>
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);

MenuComponent.displayName = "MenuComponent";

const Menu = forwardRef<HTMLButtonElement, MenuProps & HTMLProps<HTMLButtonElement>>(
  ({ ...props }, ref) => {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuComponent {...props} ref={ref} />
        </FloatingTree>
      );
    }

    return <MenuComponent {...props} ref={ref} />;
  },
);

Menu.displayName = "Menu";

export default memo(Menu);
