import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  forwardRef,
  isValidElement,
  memo,
  ReactNode,
  useId,
  useMemo,
} from "react";
import { A11y, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import iconChevronRight from "@tabler/icons/outline/chevron-right.svg";
import iconChevronLeft from "@tabler/icons/outline/chevron-left.svg";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { addClassNameToProps } from "@/utils/styles";
import Layout from "@/components/atoms/layout/Layout";
import { WithRequired } from "@/types/helpers";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import { cardSlider, controls } from "./CardSlider.styles";
import blockStyles from "./../Blocks.module.css";

import "./CardSlider.css";

const CardSlider = forwardRef<
  HTMLDivElement,
  {
    action?: ReactNode;
  } & WithRequired<ComponentPropsWithRef<"article">, "children">
>(({ action, children, ...props }, ref) => {
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
    <div {...addClassNameToProps(props, classes.base(), blockStyles.blockBase)} ref={ref}>
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
              <SvgSprite src={iconChevronLeft} />
            </button>
            <div className={clsx(controlsClasses.pagination(), paginationElId)} />
            <button
              className={clsx(controlsClasses.next(), nextElId)}
              type="button"
              aria-label={t("controls.next.ariaLabel")}
            >
              <SvgSprite src={iconChevronRight} />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
});

CardSlider.displayName = "CardSlider";

export default memo(CardSlider);
