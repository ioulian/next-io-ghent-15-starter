import type { Metadata } from "next";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");

  return {
    title: t("notFound.meta.title"),
    description: t("notFound.meta.description"),
  };
}

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.
export default function NotFoundPage() {
  const t = useTranslations("pages");

  return (
    <div>
      <div>{t("notFound.title")}</div>
    </div>
  );
}
