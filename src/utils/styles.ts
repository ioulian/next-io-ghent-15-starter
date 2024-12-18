import clsx from "clsx";

export interface PropsWithClassName {
  className?: string;
}

export const addClassNameToProps = <T extends PropsWithClassName>(
  { className, ...props }: T,
  ...newClassName: string[]
) => ({
  ...props,
  className: clsx(...newClassName, className),
});
