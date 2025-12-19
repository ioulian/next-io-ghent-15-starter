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
  // Too bad new IE (safari)... But fallback is fine.
  // eslint-disable-next-line baseline-js/use-baseline
  const dpr = window.devicePixelRatio || 1;

  return Math.round(value * dpr) / dpr;
};
