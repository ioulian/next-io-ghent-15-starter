import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  forwardRef,
  isValidElement,
  memo,
  useImperativeHandle,
  useRef,
} from "react";

import { useEffectOnce } from "react-use";

import { addClassNameToProps } from "@/utils/styles";

import Layout from "../../atoms/layout/Layout";

import blockStyles from "./../Blocks.module.css";
import styles from "./MediaText.module.css";

const MediaText = forwardRef<
  HTMLDivElement,
  { coverMedia?: boolean } & ComponentPropsWithRef<"div">
>(({ children, coverMedia = false, ...props }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffectOnce(() => {
    // For development only, show warning if number of columns does not correspond with correct variant
    if (process.env.NODE_ENV !== "production") {
      const childrenLength = Children.count(children);

      if (childrenLength !== 2) {
        console.warn(
          `You are using <MediaText> with ${childrenLength} child(ren), but 2 are needed. Node:`,
          innerRef.current,
        );
      }
    }
  });

  return (
    <div
      {...addClassNameToProps(
        props,
        styles.mediaText,
        coverMedia && styles.coverMedia,
        blockStyles.blockBase,
      )}
      ref={innerRef}
    >
      <Layout variant="twoCol">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return null;
          }

          return <div>{cloneElement(child)}</div>;
        })}
      </Layout>
    </div>
  );
});

MediaText.displayName = "MediaText";

export default memo(MediaText);
