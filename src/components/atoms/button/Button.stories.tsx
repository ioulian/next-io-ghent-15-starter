import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Link from "next/link";

import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";

import SvgSprite from "./../svg-sprite/SvgSprite";
import Button from "./Button";

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
    iconBefore: <SvgSprite name="tablerChevronLeft" />,
    iconAfter: <SvgSprite name="tablerChevronRight" />,
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
    iconBefore: <SvgSprite name="tablerSettings" />,
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
    iconBefore: <SvgSprite name="tablerSettings" />,
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

export const AsLink: Story = {
  render: (args) => <Button as="a" href="/another-page" {...args} />,
  args: {
    size: "base",
    variant: "simple",
    children: "Settings",
    disabled: false,
    isLoading: false,
    fullWidth: false,
  },
};

export const NextLink: Story = {
  render: (args) => (
    <Button as={Link} href={{ pathname: "/test" }} target="_blank" rel="noreferrer" variant={args.variant}>
      {args.children}
    </Button>
  ),
  args: {
    variant: "primary",
    children: "Navigate to another page",
    iconOnly: false,
    fullWidth: false,
    size: "normal",
    iconAfter: <SvgSprite name="tablerChevronRight" />,
  },
};
