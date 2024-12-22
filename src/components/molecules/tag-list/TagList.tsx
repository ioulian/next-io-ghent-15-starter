import { Children, ComponentPropsWithRef, FC, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./TagList.module.css";

const TagList: FC<ComponentPropsWithRef<"ul">> = ({ children, ...props }) => {
  return (
    <ul {...addClassNameToProps(props, styles.list)} role="list">
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};

/**
 * List of tags
 */
export default memo(TagList);
