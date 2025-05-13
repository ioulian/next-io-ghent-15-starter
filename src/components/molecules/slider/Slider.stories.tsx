/* eslint-disable i18next/no-literal-string */

import { SwiperSlide } from "swiper/react";

import type { Meta, StoryObj } from "@storybook/react";

import Slider from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Molecules/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Slider {...args}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Slider>
  ),
  args: { spaceBetween: 50, slidesPerView: 3 },
};
