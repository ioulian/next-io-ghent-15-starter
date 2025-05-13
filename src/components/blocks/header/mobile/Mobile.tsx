import { ComponentPropsWithRef, forwardRef, memo } from "react";

import iconMenu from "@tabler/icons/outline/menu-2.svg";
import { useTranslations } from "next-intl";

import Button from "@/components/atoms/button/Button";
import Layout from "@/components/atoms/layout/Layout";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import Dialog from "@/components/molecules/dialog/Dialog";
import DialogClose from "@/components/molecules/dialog/DialogClose";
import DialogContent from "@/components/molecules/dialog/DialogContent";
import DialogTrigger from "@/components/molecules/dialog/DialogTrigger";
import { Link } from "@/i18n/navigation";
import { addClassNameToProps } from "@/utils/styles";

import logoSprite from "./../../../../../public/img/logo-sprite.svg";

import styles from "./Mobile.module.css";

const Mobile = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ children, ...props }, ref) => {
    const t = useTranslations("common.header");

    return (
      <div {...addClassNameToProps(props, styles.mobile)} ref={ref}>
        <Layout variant="oneCol">
          <div className={styles.menu}>
            <Link href="/" className={styles.logo}>
              <SvgSprite src={logoSprite} />
            </Link>

            <div>
              <Dialog>
                <DialogTrigger>
                  <Button iconOnly iconBefore={<SvgSprite src={iconMenu} />}>
                    {t("mobile.openButton.label")}
                  </Button>
                </DialogTrigger>
                <DialogContent className={styles.dialog}>
                  <DialogClose>{t("mobile.closeButton.label")}</DialogClose>
                  {children}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Layout>
      </div>
    );
  },
);

Mobile.displayName = "Mobile";

export default memo(Mobile);
