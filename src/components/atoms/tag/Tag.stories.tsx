import type { Meta, StoryObj } from "@storybook/nextjs";

import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "UI/Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Tag 1",
  },
};
