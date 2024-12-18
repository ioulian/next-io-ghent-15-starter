"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC, PropsWithChildren } from "react";

import { LOADER_DELAY } from "@/utils/constants";

import { getVariable } from "../_styles/variables";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={getVariable("color.primary.400")}
        shouldCompareComplexProps
        delay={LOADER_DELAY}
      />
    </>
  );
};

/**
 * Providers that need client component to run.
 */
export default Providers;
