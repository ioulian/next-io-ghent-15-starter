import type { ComponentPropsWithRef } from "react";

import { Children, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./TagList.module.css";

export type Props = ComponentPropsWithRef<"ul">;

function TagList({ children, ...props }: Props) {
  return (
    <ul {...addClassNameToProps(props, styles.list)} role="list">
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
}

/**
 * List of tags
 */
export default memo(TagList);
