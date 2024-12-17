import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generateSanitizedMetadata } from "@/utils/next";

import { LocaleType } from "@/i18n/types";

type Props = Readonly<{
  params: { locale: LocaleType };
}>;

export const generateMetadata = generateSanitizedMetadata<Props>(async ({ params: { locale } }) => {
  const t = await getTranslations({ locale, namespace: "pages.home.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
});

const Page: NextPage<Props> = ({}) => {
  const t = useTranslations("pages");

  return (
    <div>
      <div>{t("home.title")}</div>
    </div>
  );
};

export default Page;
