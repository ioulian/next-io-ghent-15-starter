/* eslint-disable i18next/no-literal-string */

import { useState } from "react";

import { expect, screen, userEvent, within } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";
import Text from "@/components/atoms/text/Text";
import Tooltip from "@/components/molecules/tooltip/Tooltip";
import TooltipContent from "@/components/molecules/tooltip/TooltipContent";
import TooltipTrigger from "@/components/molecules/tooltip/TooltipTrigger";
import { wait } from "@/utils/promises";

import Popover from "./Popover";
import PopoverClose from "./PopoverClose";
import PopoverContent from "./PopoverContent";
import PopoverDescription from "./PopoverDescription";
import PopoverHeading from "./PopoverHeading";
import PopoverTrigger from "./PopoverTrigger";

const meta: Meta<typeof Popover> = {
  title: "UI/Molecules/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Uncontrolled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("trigger"));
    await wait(getVariableAsNumber("duration.normal"));
    await expect(screen.getByTestId("content")).toBeVisible();

    await userEvent.click(screen.getByTestId("close"));
    await wait(getVariableAsNumber("duration.fast"));
    await expect(screen.queryByTestId("content")).toBeNull();
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger data-testid="trigger">My trigger</PopoverTrigger>
      <PopoverContent data-testid="content">
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>My popover description</PopoverDescription>
        <PopoverClose data-testid="close">Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>My trigger</PopoverTrigger>
      <PopoverContent withCloseButton>
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>My popover description</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const PopoverInPopover: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>My trigger</PopoverTrigger>
      <PopoverContent>
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>
          My popover description
          <Popover>
            <PopoverTrigger>My trigger 2</PopoverTrigger>
            <PopoverContent>
              <PopoverHeading>My popover heading 2</PopoverHeading>
              <PopoverDescription>My popover description 2</PopoverDescription>
              <PopoverClose>Close 2</PopoverClose>
            </PopoverContent>
          </Popover>
        </PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const PopoverWithTooltip: Story = {
  render: (args) => (
    <Popover {...args}>
      <Tooltip placement="top">
        <PopoverTrigger>
          <TooltipTrigger>My trigger</TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
      <PopoverContent>
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>My popover description</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

const ControlledPopover = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Popover open={isOpen} onOpenChange={(isNewOpen) => setIsOpen(isNewOpen)}>
      <PopoverTrigger
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        My trigger
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>My popover description</PopoverDescription>
        <PopoverClose
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export const Controlled: Story = {
  render: () => <ControlledPopover />,
};

export const CustomElements: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>My trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeading>
          <Heading>My popover heading</Heading>
        </PopoverHeading>
        <PopoverDescription>
          <Text>
            <p>My popover description</p>
          </Text>
        </PopoverDescription>
        <PopoverClose>
          <Button>Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const Placement: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>My trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeading>My popover heading</PopoverHeading>
        <PopoverDescription>My popover description</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
  args: {
    placement: "right",
  },
};
