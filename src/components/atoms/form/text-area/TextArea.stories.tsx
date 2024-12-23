import type { Meta, StoryObj } from "@storybook/react";

import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "UI/Atoms/Text Area",
  component: TextArea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};
