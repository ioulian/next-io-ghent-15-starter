import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PasswordInput from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "UI/Atoms/Form/Password input",
  component: PasswordInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {},
};
