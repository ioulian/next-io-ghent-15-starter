import React from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Preview } from "@storybook/react";

import { htmlFontClass } from "@/app/[locale]/_styles/fonts";
import { getCss } from "@/app/[locale]/_styles/variables";

import messages from "../messages/en-GB/common.json";

import "@/app/[locale]/_styles/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    //actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      document.documentElement.classList.add(htmlFontClass);
      return (
        <>
          <style>{getCss()}</style>
          <NextIntlClientProvider locale="en-GB" messages={messages}>
            <Story />
          </NextIntlClientProvider>
        </>
      );
    },
  ],
};

export default preview;
