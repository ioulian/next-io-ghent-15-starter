import type { Meta, StoryObj } from "@storybook/nextjs";

import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "UI/Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    type: "h1",
    size: "h1",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};
