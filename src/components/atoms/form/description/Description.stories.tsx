import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Description from "./Description";

const meta: Meta<typeof Description> = {
  title: "UI/Atoms/Form/Description",
  component: Description,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {
  args: {
    children: "Description",
  },
};
