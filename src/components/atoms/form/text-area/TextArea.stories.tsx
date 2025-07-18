import type { Meta, StoryObj } from "@storybook/nextjs";

import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "UI/Atoms/Form/Text Area",
  component: TextArea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};
