"use client";

import type { ComponentPropsWithRef, ReactElement } from "react";

import { Children, cloneElement, isValidElement, memo, useId } from "react";

import { isString } from "@/types/type-guards";

import { addClassNameToProps } from "@/utils/styles";

import styles from "./Accordion.module.css";

export type Props = {
  /**
   * Name to pass to children
   */
  name?: string;

  children: ReactElement<{ name?: string }>[];
} & Omit<ComponentPropsWithRef<"div">, "children">;

function Accordion({ name, children, ...props }: Props) {
  const id = useId();
  const finalName = isString(name) ? name : id;

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
}

export default memo(Accordion);
