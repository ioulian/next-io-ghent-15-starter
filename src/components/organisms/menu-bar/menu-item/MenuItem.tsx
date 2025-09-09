import type { FC } from "react";

import { FocusEvent, HTMLProps, memo, MouseEvent, useContext } from "react";

import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";

import { MenuContext } from "../MenuBar.context";
import { MenuContextType, MenuItemProps } from "../MenuBar.types";

const MenuItem: FC<MenuItemProps & HTMLProps<HTMLButtonElement>> = ({
  label,
  disabled,
  ref,
  ...props
}) => {
  const menu = useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : label });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  return (
    <button
      {...props}
      ref={useMergeRefs([item.ref, ref])}
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      {...menu.getItemProps({
        active: isActive,
        onClick(event: MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event);
          tree?.events.emit("click");
        },
        onFocus(event: FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
        onMouseEnter(event: MouseEvent<HTMLButtonElement>) {
          props.onMouseEnter?.(event);
          if (menu.allowHover && menu.isOpen) {
            menu.setActiveIndex(item.index);
          }
        },
        onKeyDown(event) {
          function closeParents(parent: MenuContextType | null) {
            parent?.setIsOpen(false);
            if (parent?.parent) {
              closeParents(parent.parent);
            }
          }

          if (
            event.key === "ArrowRight" &&
            // If the root reference is in a menubar, close parents
            tree?.nodesRef.current[0].context?.elements.domReference?.closest('[role="menubar"]')
          ) {
            closeParents(menu.parent);
          }
        },
      })}
    >
      {label}
    </button>
  );
};

export default memo(MenuItem);
