"use client";

import type { FC, PropsWithChildren } from "react";
import type { SwiperProps } from "swiper/react";

import { memo } from "react";

import { A11y } from "swiper/modules";
import { Swiper } from "swiper/react";

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
