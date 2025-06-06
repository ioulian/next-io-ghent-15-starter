"use client";

import { FC, memo, PropsWithChildren } from "react";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

import { LOADER_DELAY } from "@/utils/constants";

import { getVariable } from "../_styles/variables";

const Providers: FC<PropsWithChildren<{ nonce?: string }>> = ({ children, nonce }) => {
  return (
    <ProgressProvider
      height="4px"
      shouldCompareComplexProps
      shallowRouting
      delay={LOADER_DELAY}
      color={getVariable("color.primary.400")}
      nonce={nonce}
    >
      {children}
    </ProgressProvider>
  );
};

/**
 * Providers that need client component to run.
 */
export default memo(Providers);
