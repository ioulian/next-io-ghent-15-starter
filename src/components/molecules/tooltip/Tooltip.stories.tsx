/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { userEvent, within, expect, screen } from "@storybook/test";

import { wait } from "@/utils/promises";
import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Button from "@/components/atoms/button/Button";

import Tooltip from "./Tooltip";
import TooltipTrigger from "./TooltipTrigger";
import TooltipContent from "./TooltipContent";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Molecules/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Uncontrolled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByTestId("trigger"));
    await wait(getVariableAsNumber("duration.normal"));
    await expect(screen.getByTestId("content")).toBeVisible();

    await userEvent.unhover(canvas.getByTestId("trigger"));
    await wait(getVariableAsNumber("duration.fast"));
    await expect(screen.queryByTestId("content")).toBeNull();
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger data-testid="trigger">My trigger</TooltipTrigger>
      <TooltipContent data-testid="content">My tooltip</TooltipContent>
    </Tooltip>
  ),
};

const ControlledTooltip = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Tooltip open={isOpen} onOpenChange={(isNewOpen) => setIsOpen(isNewOpen)}>
      <TooltipTrigger
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        My trigger
      </TooltipTrigger>
      <TooltipContent>My tooltip</TooltipContent>
    </Tooltip>
  );
};

export const Controlled: Story = {
  render: () => <ControlledTooltip />,
  args: {
    open: true,
  },
};

export const CustomElements: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button>My trigger</Button>
      </TooltipTrigger>
      <TooltipContent>My tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const Placement: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button>My trigger</Button>
      </TooltipTrigger>
      <TooltipContent>My tooltip</TooltipContent>
    </Tooltip>
  ),
  args: {
    placement: "right",
  },
};
