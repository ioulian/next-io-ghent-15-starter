"use client";

import { FC, PropsWithChildren } from "react";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { LOADER_DELAY } from "@/utils/constants";

import { getVariable } from "../_styles/variables";

const Providers: FC<PropsWithChildren<{ nonce?: string }>> = ({ children, nonce }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={getVariable("color.primary.400")}
        shouldCompareComplexProps
        delay={LOADER_DELAY}
        nonce={nonce}
      />
    </>
  );
};

/**
 * Providers that need client component to run.
 */
export default Providers;
