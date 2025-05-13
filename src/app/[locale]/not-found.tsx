import { Metadata } from "next";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/types";

type Props = Readonly<{
  params: { locale: LocaleType };
}>;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return {
    title: t("notFound.meta.title"),
    description: t("notFound.meta.description"),
  };
}

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.
export default function NotFoundPage({}: Props) {
  const t = useTranslations("pages");

  return (
    <div>
      <div>{t("notFound.title")}</div>
    </div>
  );
}
