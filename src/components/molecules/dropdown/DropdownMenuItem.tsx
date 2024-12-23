"use client";

import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";
import { HTMLProps, cloneElement, forwardRef, isValidElement, memo, useContext } from "react";

import { MenuContext, WithTypeAheadKey } from "./Dropdown";

const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  { closeOnClick?: boolean } & WithTypeAheadKey & HTMLProps<HTMLButtonElement>
>(({ children, typeaheadKey, disabled, closeOnClick = true, ...props }, forwardedRef) => {
  const menu = useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : typeaheadKey });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  const ref = useMergeRefs([item.ref, forwardedRef]);

  if (isValidElement<Record<string, unknown>>(children)) {
    return cloneElement(children, {
      ref,
      ...props,
      type: "button",
      role: "menuitem",
      tabIndex: isActive ? 0 : -1,
      disabled,
      ...menu.getItemProps({
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event);
          if (closeOnClick) {
            tree?.events.emit("click");
          }
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
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
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event);
          if (closeOnClick) {
            tree?.events.emit("click");
          }
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
      })}
    >
      {children}
    </button>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

export default memo(DropdownMenuItem);
