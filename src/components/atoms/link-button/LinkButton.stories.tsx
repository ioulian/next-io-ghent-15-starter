import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Link from "next/link";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";

import SvgSprite from "./../svg-sprite/SvgSprite";
import LinkButton from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "UI/Atoms/Link Button",
  component: LinkButton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  render: (args) => <LinkButton {...args} />,
  args: {
    variant: "primary",
    size: "normal",
    children: "Button",
    iconOnly: false,
    fullWidth: false,
  },
};

export const WithIcons: Story = {
  render: (args) => <LinkButton {...args} />,
  args: {
    variant: "primary",
    size: "normal",
    children: "Button",
    iconOnly: false,
    fullWidth: false,
    iconBefore: <SvgSprite name="tablerChevronLeft" title="test-title" />,
    iconAfter: <SvgSprite name="tablerChevronRight" title="test-title" />,
  },
};

export const IconOnly: Story = {
  render: (args) => <LinkButton {...args} />,
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    fullWidth: false,
    iconBefore: <SvgSprite name="tablerSettings" />,
    iconOnly: true,
  },
};

export const AccessibleIconButton: Story = {
  render: (args) => (
    <Tooltip placement="bottom">
      <TooltipTrigger>
        <LinkButton {...args} />
      </TooltipTrigger>
      <TooltipContent>Settings</TooltipContent>
    </Tooltip>
  ),
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    fullWidth: false,
    iconBefore: <SvgSprite name="tablerSettings" />,
    iconOnly: true,
  },
};

export const Text: Story = {
  render: (args) => <LinkButton {...args} />,
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    fullWidth: false,
  },
};

export const NextLink: Story = {
  render: (args) => <LinkButton as={Link} {...args} href="/test" target="_blank" rel="noreferrer" />,
  args: {
    variant: "primary",
    children: "Navigate to another page",
    iconOnly: false,
    fullWidth: false,
    size: "normal",
    iconAfter: <SvgSprite name="tablerChevronRight" />,
  },
};
