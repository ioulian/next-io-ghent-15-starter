/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import iconChevronRight from "@tabler/icons/outline/chevron-right.svg";
import iconChevronLeft from "@tabler/icons/outline/chevron-left.svg";
import iconSettings from "@tabler/icons/outline/settings.svg";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";

import Button from "./Button";
import SvgSprite from "./../svg-sprite/SvgSprite";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: "primary",
    size: "normal",
    isLoading: false,
    children: "Button",
    disabled: false,
    iconOnly: false,
    fullWidth: false,
  },
};

export const Loading: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: "primary",
    size: "normal",
    isLoading: true,
    children: "Button",
    disabled: false,
    iconOnly: false,
    fullWidth: false,
  },
};

export const WithIcons: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: "primary",
    size: "normal",
    isLoading: false,
    children: "Button",
    disabled: false,
    iconOnly: false,
    fullWidth: false,
    iconBefore: <SvgSprite src={iconChevronLeft} title="test-title" />,
    iconAfter: <SvgSprite src={iconChevronRight} title="test-title" />,
  },
};

export const IconOnly: Story = {
  render: (args) => <Button {...args} />,
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    disabled: false,
    isLoading: false,
    fullWidth: false,
    iconBefore: <SvgSprite src={iconSettings} />,
    iconOnly: true,
  },
};

export const AccessibleIconButton: Story = {
  render: (args) => (
    <Tooltip placement="bottom">
      <TooltipTrigger>
        <Button {...args} />
      </TooltipTrigger>
      <TooltipContent>Settings</TooltipContent>
    </Tooltip>
  ),
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    disabled: false,
    isLoading: false,
    fullWidth: false,
    iconBefore: <SvgSprite src={iconSettings} />,
    iconOnly: true,
  },
};

export const Text: Story = {
  render: (args) => <Button {...args} />,
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    disabled: false,
    isLoading: false,
    fullWidth: false,
  },
};
