"use client";

import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useId,
} from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Accordion.module.css";

const Accordion = forwardRef<
  HTMLDivElement,
  {
    /**
     * Name to pass to children
     */
    name?: string;

    children: ReactElement<{ name?: string }>[];
  } & Omit<ComponentPropsWithRef<"div">, "children">
>(({ name, children, ...props }, ref) => {
  console.log(props);
  const id = useId();
  const finalName = typeof name === "string" ? name : id;

  return (
    <div {...addClassNameToProps(props, styles.accordion)} ref={ref}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              name: finalName,
            })
          : /* c8 ignore next */
            null,
      )}
    </div>
  );
});

Accordion.displayName = "Accordion";

export default memo(Accordion);
