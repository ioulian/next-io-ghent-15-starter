"use client";

import type { FC } from "react";

import {
  cloneElement,
  FocusEvent,
  HTMLProps,
  isValidElement,
  KeyboardEvent,
  memo,
  MouseEvent,
  useCallback,
  useContext,
} from "react";

import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";

import { MenuContext, MenuContextType, WithTypeAheadKey } from "./Dropdown";

const DropdownMenuItem: FC<
  { closeOnClick?: boolean } & WithTypeAheadKey & HTMLProps<HTMLButtonElement>
> = ({
  children,
  typeaheadKey,
  disabled,
  closeOnClick = true,
  onClick,
  onFocus,
  onMouseEnter,
  ref: forwardedRef,
  ...props
}) => {
  const menu = useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : typeaheadKey });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  const ref = useMergeRefs([item.ref, forwardedRef]);

  const onClickCallback = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (closeOnClick) {
        tree?.events.emit("click");
      }
    },
    [onClick, closeOnClick, tree?.events],
  );

  const onFocusCallback = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      menu.setHasFocusInside(true);
    },
    [onFocus, menu],
  );

  const onMouseEnterCallback = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(event);
      if (menu.allowHover && menu.isOpen) {
        menu.setActiveIndex(item.index);
      }
    },
    [onMouseEnter, menu, item.index],
  );

  // Can be outside of component
  const closeParents = useCallback((parent: MenuContextType | null) => {
    parent?.setIsOpen(false);
    if (parent?.parent) {
      closeParents(parent.parent);
    }
  }, []);

  const onKeyDownCallback = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (
        event.key === "ArrowRight" &&
        // If the root reference is in a menubar, close parents
        tree?.nodesRef.current[0].context?.elements.domReference?.closest('[role="menubar"]')
      ) {
        closeParents(menu.parent);
      }
    },
    [closeParents, menu.parent, tree?.nodesRef],
  );

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      ref,
      ...props,
      type: "button",
      role: "menuitem",
      tabIndex: isActive ? 0 : -1,
      disabled,
      ...menu.getItemProps({
        onClick: onClickCallback,
        onFocus: onFocusCallback,
        onMouseEnter: onMouseEnterCallback,
        onKeyDown: onKeyDownCallback,
      }),
    });
  }

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...menu.getItemProps({
        onClick: onClickCallback,
        onFocus: onFocusCallback,
        onMouseEnter: onMouseEnterCallback,
        onKeyDown: onKeyDownCallback,
      })}
    >
      {children}
    </button>
  );
};

export default memo(DropdownMenuItem);
