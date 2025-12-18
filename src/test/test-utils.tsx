import type { RenderOptions } from "@testing-library/react";
import type { FC, PropsWithChildren, ReactNode } from "react";

import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import defaultMessages from "../../messages/en-GB/common.json";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextIntlClientProvider locale="en-GB" messages={defaultMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (ui: ReactNode, options?: RenderOptions) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
