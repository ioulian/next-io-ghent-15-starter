"use client";

import { FC, memo, PropsWithChildren } from "react";

import { A11y } from "swiper/modules";
import { Swiper, SwiperProps } from "swiper/react";

import styles from "./Slider.module.css";

import "./Slider.css";

const Slider: FC<PropsWithChildren<SwiperProps>> = ({ children, modules, ...props }) => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper {...props} modules={Array.isArray(modules) ? [...modules, A11y] : [A11y]}>
        {children}
      </Swiper>
    </div>
  );
};

/**
 * Wrapper around `swiper` component.
 */
export default memo(Slider);
