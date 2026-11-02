import type { Preview } from "@storybook/nextjs-vite";

import { htmlFontClass } from "@/app/[locale]/_styles/fonts";
import { getCss, getThemeCss } from "@/app/[locale]/_styles/variables";

import nextIntl from "./next-intl";

import "@/app/[locale]/_styles/globals.css";

const preview: Preview = {
  initialGlobals: {
    locale: "en-GB",
    locales: {
      "en-GB": "English",
      "fr-BE": "Français",
      "nl-BE": "Nederlands",
    },
  },
  parameters: {
    layout: "centered",

    //actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },

    nextIntl,

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story) => {
      document.documentElement.classList.add(...htmlFontClass.split(" "), "theme--default");
      return (
        <>
          <style>{getCss()}</style>
          <style>{getThemeCss()}</style>
          <Story />
        </>
      );
    },
  ],
};

export default preview;
