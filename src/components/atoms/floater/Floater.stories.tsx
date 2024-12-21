import type { Meta, StoryObj } from "@storybook/react";

import Floater from "./Floater";

const meta: Meta<typeof Floater> = {
  title: "UI/Atoms/Floater",
  component: Floater,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Floater>;

export const Default: Story = {
  args: {
    children: "Content",
  },
};
