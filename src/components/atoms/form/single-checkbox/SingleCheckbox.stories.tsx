import type { Meta, StoryObj } from "@storybook/nextjs";

import SingleCheckbox from "./SingleCheckbox";

const meta: Meta<typeof SingleCheckbox> = {
  title: "UI/Atoms/Form/Single Checkbox",
  component: SingleCheckbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SingleCheckbox>;

export const Default: Story = {
  args: {},
};

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
  },
};
