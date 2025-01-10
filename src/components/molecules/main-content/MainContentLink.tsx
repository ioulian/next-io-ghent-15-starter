import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import { MAIN_CONTENT_ID } from "./MainContent.constants";
import styles from "./MainContentLink.module.css";

const MainContentLink: FC = () => {
  const t = useTranslations("common.mainContent");

  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.link}>
      {t("link.label")}
    </a>
  );
};

export default memo(MainContentLink);
