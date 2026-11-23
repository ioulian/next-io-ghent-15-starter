import type { CompositeItemProps } from "@floating-ui/react";
import type { HTMLAttributes, HTMLProps } from "react";

import { memo, useCallback } from "react";

import { CompositeItem } from "@floating-ui/react";

import { addClassNameToProps } from "@/utils/styles";

export type Props = HTMLProps<HTMLElement> & CompositeItemProps;

function MenuBarRootItem(props: Props) {
  const defaultRender = useCallback((props: HTMLAttributes<HTMLElement>) => <button type="button" {...props} />, []);

  return <CompositeItem role="menuitem" render={defaultRender} {...addClassNameToProps(props, "")} />;
}

export default memo(MenuBarRootItem);
