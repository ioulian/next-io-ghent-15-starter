import { forwardRef, HTMLAttributes, HTMLProps, memo, useCallback } from "react";

import { CompositeItem, CompositeItemProps } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

const MenuBarRootItem = forwardRef<HTMLElement, HTMLProps<HTMLElement> & CompositeItemProps>(
  ({ ...props }, ref) => {
    const defaultRender = useCallback(
      (props: HTMLAttributes<HTMLElement>) => <button type="button" {...props} />,
      [],
    );

    return (
      <CompositeItem
        role="menuitem"
        render={defaultRender}
        {...addClassNameToProps(props, "")}
        ref={ref}
      />
    );
  },
);

MenuBarRootItem.displayName = "MenuBarRootItem";

export default memo(MenuBarRootItem);
