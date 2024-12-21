import type { Meta, StoryObj } from "@storybook/react";

import CircularProgress from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "UI/Atoms/Circular Progress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  render: (args) => <CircularProgress {...args} />,
  args: {
    percent: 0.37,
    mainColor: "var(--color-primary-500)",
  },
};

export const WithBackground: Story = {
  render: (args) => <CircularProgress {...args} />,
  args: {
    percent: 0.64,
    mainColor: "var(--color-negative-500)",
    backgroundColor: "var(--color-negative-200)",
  },
};
