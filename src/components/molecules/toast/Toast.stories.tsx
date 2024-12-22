import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/atoms/button/Button";

import { success } from "./notify";

const meta: Meta<typeof Button> = {
  title: "UI/Molecules/Toast",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <Button
      {...args}
      onClick={() => {
        success("Toast is loaded dynamically!");
      }}
    />
  ),
  args: {
    variant: "primary",
    children: "Show toast",
  },
};
