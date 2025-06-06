import type { Meta, StoryObj } from "@storybook/nextjs";

import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI/Atoms/Form/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};
