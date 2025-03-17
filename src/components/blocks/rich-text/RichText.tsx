import { ComponentPropsWithRef, forwardRef, memo } from "react";

import { addClassNameToProps } from "@/utils/styles";
import Text from "@/components/atoms/text/Text";

import Layout from "../../atoms/layout/Layout";

import styles from "./RichText.module.css";

const RichText = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <div {...addClassNameToProps(props, styles.richText)} ref={ref}>
        <Layout variant="oneCol">
          <Text>{children}</Text>
        </Layout>
      </div>
    );
  },
);

RichText.displayName = "RichText";

export default memo(RichText);
