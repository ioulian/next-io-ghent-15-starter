import type { FC } from "react";

import { HTMLAttributes, HTMLProps, memo, useCallback } from "react";

import { CompositeItem, CompositeItemProps } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

const MenuBarRootItem: FC<HTMLProps<HTMLElement> & CompositeItemProps> = (props) => {
  const defaultRender = useCallback(
    (props: HTMLAttributes<HTMLElement>) => <button type="button" {...props} />,
    [],
  );

  return (
    <CompositeItem role="menuitem" render={defaultRender} {...addClassNameToProps(props, "")} />
  );
};

export default memo(MenuBarRootItem);
