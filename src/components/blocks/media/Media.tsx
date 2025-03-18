import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import styles from "./Media.module.css";

const Media = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <div {...addClassNameToProps(props, styles.media)} ref={ref}>
        <Layout variant="oneCol">{children}</Layout>
      </div>
    );
  },
);

Media.displayName = "Media";

export default memo(Media);
