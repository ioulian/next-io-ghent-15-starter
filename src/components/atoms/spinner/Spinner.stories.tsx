import type { Meta, StoryObj } from "@storybook/nextjs";

import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    "aria-label": "Loading",
  },
};

export const WithLabel: Story = {
  args: {
    children: "Loading...",
    "aria-label": "Loading",
  },
};

export const WithCustomColors: Story = {
  args: {
    "aria-label": "Loading",
    primaryColor: "#fff",
    secondaryColor: "#647373",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    style: { width: "200px", height: "200px" },
  },
};

export const FullSize: Story = {
  args: {
    "aria-label": "Loading",
    size: "full",
  },
};
