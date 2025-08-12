import type { Meta, StoryObj } from "@storybook/nextjs";

import Tag from "@/components/atoms/tag/Tag";

import TagList from "./TagList";

const meta: Meta<typeof TagList> = {
  title: "UI/Molecules/Tag List",
  component: TagList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Default: Story = {
  render: (args) => (
    <TagList {...args}>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Tag 3</Tag>
      <Tag>Tag 4</Tag>
    </TagList>
  ),
};
