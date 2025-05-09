import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata, Viewport } from "next";
import { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import { LocaleType } from "@/i18n/types";

import Providers from "./_components/Providers";
import { htmlFontClass } from "./_styles/fonts";
import { getCss } from "./_styles/variables";
import "./_styles/globals.css";

type Params = Promise<{ locale: LocaleType }>;

export function generateViewport(): Viewport {
  return {
    themeColor: "#fff",
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={htmlFontClass}>
      <head>
        <style>{getCss()}</style>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
