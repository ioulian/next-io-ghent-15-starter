import type { FC } from "react";

import { Children, cloneElement, ComponentPropsWithRef, isValidElement, memo, ReactNode, useId, useMemo } from "react";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import { WithRequired } from "@/types/helpers";

import Layout from "@/components/atoms/layout/Layout";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import { addClassNameToProps } from "@/utils/styles";

import { cardSlider, controls } from "./CardSlider.styles";

import blockStyles from "./../Blocks.module.css";

import "./CardSlider.css";

const CardSlider: FC<
  {
    action?: ReactNode;
  } & WithRequired<ComponentPropsWithRef<"div">, "children">
> = ({ action, children, ...props }) => {
  const t = useTranslations("common.cardSlider");
  const paginationElId = useId();
  const prevElId = useId();
  const nextElId = useId();

  const classes = cardSlider();
  const controlsClasses = controls();

  const swiperSettings = useMemo<SwiperOptions>(() => {
    return {
      modules: [Pagination, Navigation, A11y],
      slidesPerView: "auto",
      spaceBetween: 32,
      pagination: {
        el: `.${paginationElId}`,
      },
      navigation: {
        prevEl: `.${prevElId}`,
        nextEl: `.${nextElId}`,
      },
    };
  }, [paginationElId, prevElId, nextElId]);

  return (
    <div {...addClassNameToProps(props, classes.base(), blockStyles.blockBase)}>
      <Layout variant="oneCol" className={classes.body()}>
        <Swiper {...swiperSettings}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) {
              return null;
            }

            return <SwiperSlide className={classes.slide()}>{cloneElement(child)}</SwiperSlide>;
          })}
        </Swiper>
      </Layout>
      <Layout variant="oneCol" as="footer" className={classes.footer()}>
        <div>
          {action}
          <div className={controlsClasses.base()}>
            <button
              className={clsx(controlsClasses.prev(), prevElId)}
              type="button"
              aria-label={t("controls.prev.ariaLabel")}
            >
              <SvgSprite name="tablerChevronLeft" />
            </button>
            <div className={clsx(controlsClasses.pagination(), paginationElId)} />
            <button
              className={clsx(controlsClasses.next(), nextElId)}
              type="button"
              aria-label={t("controls.next.ariaLabel")}
            >
              <SvgSprite name="tablerChevronRight" />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default memo(CardSlider);
