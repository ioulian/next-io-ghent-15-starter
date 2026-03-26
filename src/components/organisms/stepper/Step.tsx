"use client";

import type { ComponentPropsWithRef, FC, PropsWithChildren } from "react";

import { memo } from "react";

import clsx from "clsx";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import styles from "./Stepper.module.css";

// TODO: add aria-controls to the button
const Step: FC<
  PropsWithChildren<
    { isCurrent?: boolean; isDone?: boolean; index: number; onClick?: () => void } & ComponentPropsWithRef<"li">
  >
> = ({ isCurrent, isDone, index, children, onClick, ...props }) => {
  return (
    <li
      className={clsx(
        styles.step,
        isCurrent && styles.stepCurrent,
        isDone && styles.stepDone,
        onClick && styles.stepClickable,
      )}
      aria-current={isCurrent ? "step" : undefined}
      {...props}
    >
      <button type="button" onClick={onClick} role="tab">
        <span>{isDone ? <SvgSprite name="tablerCheck" /> : index + 1}</span>
        {children}
      </button>
    </li>
  );
};

export default memo(Step);
