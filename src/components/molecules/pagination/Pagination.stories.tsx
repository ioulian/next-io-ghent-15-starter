import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI/Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => <Pagination {...args} />,
  args: {
    breakLabel: "...",
    nextLabel: <SvgSprite name="tablerChevronRight" />,
    pageRangeDisplayed: 5,
    pageCount: 30,
    previousLabel: <SvgSprite name="tablerChevronLeft" />,
  },
};
