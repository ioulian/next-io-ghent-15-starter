"use client";

import type { PropsWithChildren } from "react";

import { memo } from "react";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

import { LOADER_DELAY } from "@/utils/constants";

import { getVariable } from "../_styles/variables";

export type Props = PropsWithChildren<{ nonce?: string }>;

function Providers({ children, nonce }: Props) {
  return (
    <ProgressProvider
      height="4px"
      shouldCompareComplexProps
      shallowRouting
      delay={LOADER_DELAY}
      color={getVariable("color.blue.400")}
      nonce={nonce}
    >
      {children}
    </ProgressProvider>
  );
}

/**
 * Providers that need client component to run.
 */
export default memo(Providers);
