import clsx, { ClassValue } from "clsx";

export interface PropsWithClassName {
  className?: string;
}

export const addClassNameToProps = <T extends PropsWithClassName>(
  { className, ...props }: T,
  ...newClassName: ClassValue[]
) => ({
  ...props,
  className: clsx(...newClassName, className),
});

export const roundByDPR = (value: number): number => {
  const dpr = window.devicePixelRatio || 1;

  return Math.round(value * dpr) / dpr;
};
