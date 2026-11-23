import type { ComponentPropsWithRef, ElementType } from "react";

export type WithRequired<TType, Key extends keyof TType> = TType & { [P in Key]-?: TType[P] };

export type Join<K, P> = K extends string ? (P extends string ? `${K}${"" extends P ? "" : "."}${P}` : never) : never;

export type Paths<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string ? `${K}` | Join<K, Paths<T[K]>> : never;
    }[keyof T]
  : "";

export type Leaves<T> = T extends object
  ? {
      [K in keyof T]-?: Join<K, Leaves<T[K]>>;
    }[keyof T]
  : "";

export type PolymorphicProps<E extends ElementType, Own = object> = Own & {
  as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof Own | "as">;
