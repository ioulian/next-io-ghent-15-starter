import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { htmlFontClass } from "@/app/_styles/fonts";
import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { LocaleType } from "@/i18n/types";

type Props = Readonly<{
  children: ReactNode;
  params: { locale: LocaleType };
}>;

export function generateViewport(): Viewport {
  return {
    themeColor: "#fff",
    initialScale: 1,
    userScalable: true,
  };
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">): Promise<Metadata> {
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  // @ts-expect-error "locale" is a string, we need to check if it's correct first
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={htmlFontClass}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
