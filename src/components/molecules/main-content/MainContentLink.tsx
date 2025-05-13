import { FC, memo } from "react";

import { useTranslations } from "next-intl";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import { MAIN_CONTENT_ID } from "./MainContent.constants";

import styles from "./MainContentLink.module.css";

const MainContentLink: FC = () => {
  const t = useTranslations("common.mainContent");

  return (
    <VisuallyHidden>
      <a href={`#${MAIN_CONTENT_ID}`} className={styles.link}>
        {t("link.label")}
      </a>
    </VisuallyHidden>
  );
};

export default memo(MainContentLink);
