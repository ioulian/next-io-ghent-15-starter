import type { Meta, StoryObj } from "@storybook/nextjs";

import iconVariantDanger from "@tabler/icons/outline/alert-circle.svg";
import iconVariantSuccess from "@tabler/icons/outline/circle-check.svg";
import iconVariantNormal from "@tabler/icons/outline/info-circle.svg";
import { expect, userEvent, within } from "storybook/test";

import Button from "@/components/atoms/button/Button";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

import ButtonBar from "./ButtonBar";

const meta: Meta<typeof ButtonBar> = {
  title: "UI/Molecules/Button Bar",
  component: ButtonBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ButtonBar>;

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
    <ButtonBar {...args}>
      <Button data-testid="button1">Primary Action</Button>
      <Button variant="outline" data-testid="button2">
        Secondary Action
      </Button>
      <Button variant="outline" data-testid="button3">
        Cancel
      </Button>
    </ButtonBar>
  ),
  args: {},
};

export const IconsOnly: Story = {
  render: (args) => (
    <ButtonBar {...args}>
      <Button data-testid="button1" size="small" iconBefore={<SvgSprite src={iconVariantNormal} />} iconOnly>
        Button 1
      </Button>
      <Button data-testid="button2" size="small" iconBefore={<SvgSprite src={iconVariantDanger} />} iconOnly>
        Button 2
      </Button>
      <Button data-testid="button3" size="small" iconBefore={<SvgSprite src={iconVariantSuccess} />} iconOnly>
        Button 3
      </Button>
    </ButtonBar>
  ),
  args: {},
};
