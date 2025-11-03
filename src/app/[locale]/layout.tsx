import type { LocaleType } from "@/i18n/types";

import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getNonce } from "@/utils/csp";

import Providers from "./_components/Providers";
import { htmlFontClass } from "./_styles/fonts";
import { getCss, getThemeCss, getVariable } from "./_styles/variables";

import "./_styles/globals.css";

import { clsx } from "clsx";

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

export async function generateMetadata({ params }: Omit<LayoutProps<"/[locale]">, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as LocaleType, namespace: "app.defaultMeta" });

  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
  };
}

let ReactScan: React.ComponentType = () => null;

if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_REACT_SCAN_ENABLE === "true") {
  ReactScan = dynamic(() => import("./_components/ReactScan"));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const nonce = await getNonce();

  return (
    <html lang={locale} className={clsx(htmlFontClass, "theme--default")}>
      <head>
        <style nonce={nonce}>{getCss()}</style>
        <style nonce={nonce}>{getThemeCss()}</style>
      </head>
      <ReactScan />
      <body>
        <NextIntlClientProvider>
          <Providers nonce={nonce || undefined}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
