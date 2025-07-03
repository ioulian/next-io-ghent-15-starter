import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { LocaleType } from "@/i18n/types";
import { getNonce } from "@/utils/csp";

import Providers from "./_components/Providers";
import { htmlFontClass } from "./_styles/fonts";
import { getCss, getVariable } from "./_styles/variables";

import "./_styles/globals.css";

import dynamic from "next/dynamic";

type Params = Promise<{ locale: LocaleType }>;

export function generateViewport(): Viewport {
  return {
    themeColor: getVariable("color.primary.500"),
    initialScale: 1,
    userScalable: true,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "app.defaultMeta" });

  return {
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
  };
}

let ReactScan: React.ComponentType = () => null;

if (
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_REACT_SCAN_ENABLE === "true"
) {
  ReactScan = dynamic(() => import("./_components/ReactScan"));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const nonce = await getNonce();

  return (
    <html lang={locale} className={htmlFontClass}>
      <head>
        <style nonce={nonce}>{getCss()}</style>
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
