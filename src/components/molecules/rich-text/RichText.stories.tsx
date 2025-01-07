import type { Meta, StoryObj } from "@storybook/react";

import RichText from "./RichText";

const meta: Meta<typeof RichText> = {
  title: "UI/Molecules/Rich text",
  component: RichText,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {},
};
