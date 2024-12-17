export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type WithRequired<TType, Key extends keyof TType> = TType & { [P in Key]-?: TType[P] };
