"use client";

import type { ComponentPropsWithRef, FC, ReactElement } from "react";

import { Children, cloneElement, isValidElement, memo, useId } from "react";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Accordion.module.css";

const Accordion: FC<
  {
    /**
     * Name to pass to children
     */
    name?: string;

    children: ReactElement<{ name?: string }>[];
  } & Omit<ComponentPropsWithRef<"div">, "children">
> = ({ name, children, ...props }) => {
  const id = useId();
  const finalName = typeof name === "string" ? name : id;

  return (
    <div {...addClassNameToProps(props, styles.accordion)}>
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
};

export default memo(Accordion);
