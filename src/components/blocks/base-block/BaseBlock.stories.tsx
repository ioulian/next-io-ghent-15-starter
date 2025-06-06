/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/nextjs";

import BaseBlock from "./BaseBlock";

const meta: Meta<typeof BaseBlock> = {
  title: "Boilerplate/Blocks/Base block",
  component: BaseBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BaseBlock>;

export const Default: Story = {
  render: () => {
    return <BaseBlock>content</BaseBlock>;
  },
};
