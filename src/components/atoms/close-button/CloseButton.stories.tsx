/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/nextjs";

import CloseButton from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "UI/Atoms/Close Button",
  component: CloseButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
  render: () => <CloseButton>Close</CloseButton>,
};
