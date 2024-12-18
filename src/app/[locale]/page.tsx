import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import sampleSvgSprite from "@tabler/icons/outline/abc.svg";

import { generateSanitizedMetadata } from "@/utils/next";
import { LocaleType } from "@/i18n/types";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

type Props = Readonly<{
  params: Promise<{ locale: LocaleType }>;
}>;

export const generateMetadata = generateSanitizedMetadata<Props>(async ({ params }) => {
  const { locale } = await params;
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
      <SvgSprite src={sampleSvgSprite} />
    </div>
  );
};

export default Page;
