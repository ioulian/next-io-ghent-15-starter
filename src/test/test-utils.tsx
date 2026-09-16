import type { RenderOptions } from "@testing-library/react";
import type { FC, PropsWithChildren, ReactNode } from "react";

import { act, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { wait } from "@/utils/promises";

import defaultMessages from "../../messages/en-GB/common.json";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextIntlClientProvider locale="en-GB" messages={defaultMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (ui: ReactNode, options?: RenderOptions) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * Stall for a while so pending state updates can settle. Runs inside `act` because
 * components can update state from timers (e.g. `input-otp`), which React warns about
 * when it happens outside of `act`.
 *
 * @param ms Number of milliseconds
 */
const waitInAct = async (ms: number) => {
  await act(async () => {
    await wait(ms);
  });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, waitInAct };
