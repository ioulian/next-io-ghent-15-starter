import type { Metadata, Viewport } from "next";

import dynamic from "next/dynamic";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getNonce } from "@/utils/csp";

import Providers from "./_components/Providers";
import { htmlFontClass } from "./_styles/fonts";
import { getCss, getThemeCss, getVariable } from "./_styles/variables";

import "./_styles/globals.css";

import type { ComponentType, ReactNode } from "react";

import { clsx } from "clsx";

import { env } from "@/env.mjs";

export function generateViewport(): Viewport {
  return {
    themeColor: getVariable("color.blue.500"),
    initialScale: 1,
    userScalable: true,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({}: Omit<LayoutProps<"/[locale]">, "children">): Promise<Metadata> {
  const t = await getTranslations("app.defaultMeta");

  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
  };
}

let ReactScan: ComponentType = () => null;
let RscBoundaryProvider: ComponentType<{ children: ReactNode }> = ({ children }) => children;

if (process.env.NODE_ENV === "development" && env.NEXT_PUBLIC_REACT_SCAN_ENABLE) {
  ReactScan = dynamic(() => import("./_components/ReactScan"));
}

if (process.env.NODE_ENV === "development" && env.NEXT_PUBLIC_RSC_BOUNDARY_ENABLE) {
  RscBoundaryProvider = dynamic(() => import("@rsc-boundary/next").then((mod) => mod.RscBoundaryProvider));
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  const nonce = await getNonce();

  return (
    <html lang={locale} className={clsx(htmlFontClass, "theme--default")} data-scroll-behavior="smooth">
      <head>
        <style nonce={nonce}>{getCss()}</style>
        <style nonce={nonce}>{getThemeCss()}</style>
      </head>
      <ReactScan />
      <body>
        <NextIntlClientProvider>
          <RscBoundaryProvider>
            <Providers nonce={nonce || undefined}>{children}</Providers>
          </RscBoundaryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
