import { ComponentPropsWithRef, JSXElementConstructor } from "react";

export type InferComponentProps<T> =
  T extends // eslint-disable-next-line @typescript-eslint/no-explicit-any
  JSXElementConstructor<any>
    ? ComponentPropsWithRef<T>
    : never;
