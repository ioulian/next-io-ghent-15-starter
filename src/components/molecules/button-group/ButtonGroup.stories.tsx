import { expect, userEvent, within } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/nextjs";

import Button from "@/components/atoms/button/Button";

import ButtonGroup from "./ButtonGroup";
import ButtonGroupSeparator from "./ButtonGroupSeparator";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/Molecules/Button Group",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button1"));
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button2"));
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button3"));
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button data-testid="button1">Primary Action</Button>
      <Button variant="secondary" data-testid="button2">
        Secondary Action
      </Button>
      <ButtonGroupSeparator />
      <Button size="base" variant="simple" data-testid="button3">
        Cancel
      </Button>
    </ButtonGroup>
  ),
  args: {},
};

export const AlignEnd: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button size="base" variant="simple">
        Cancel
      </Button>
      <ButtonGroupSeparator />
      <Button>Primary Action</Button>
    </ButtonGroup>
  ),
  args: {
    align: "end",
  },
};
