import type { LocaleType } from "@/i18n/types";

import { NextPage } from "next";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { generateSanitizedMetadata } from "@/utils/next";

export const generateMetadata = generateSanitizedMetadata<Omit<PageProps<"/[locale]">, "children">>(
  async ({ params }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale: locale as LocaleType, namespace: "pages.home.meta" });

    return {
      title: t("title"),
      description: t("description"),
    };
  },
);

const Page: NextPage<PageProps<"/[locale]">> = ({}) => {
  const t = useTranslations("pages");

  return (
    <div>
      <div>{t("home.title")}</div>
      <SvgSprite name="logo" />
    </div>
  );
};

export default Page;
