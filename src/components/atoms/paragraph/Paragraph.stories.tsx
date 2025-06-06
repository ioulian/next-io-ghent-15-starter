import type { Meta, StoryObj } from "@storybook/nextjs";

import Paragraph from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "UI/Atoms/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    size: "normal",
    children: "Paragraph text",
  },
};

export const Clamped: Story = {
  args: {
    size: "normal",
    children:
      "Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text Paragraph text",
    maxLines: 3,
  },
};
