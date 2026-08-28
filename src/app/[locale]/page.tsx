import type { NextPage } from "next";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import LocaleSwitcher from "@/components/molecules/locale-switcher/LocaleSwitcher";
import { generateSanitizedMetadata } from "@/utils/next";

export const generateMetadata = generateSanitizedMetadata<Omit<PageProps<"/[locale]">, "children">>(async ({}) => {
  const t = await getTranslations("pages.home.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
});

const Page: NextPage<PageProps<"/[locale]">> = ({}) => {
  const t = useTranslations("pages");

  return (
    <div>
      <div>{t("home.title")}</div>
      <LocaleSwitcher />
      <SvgSprite name="logo" title="iO Logo" />
    </div>
  );
};

export default Page;
