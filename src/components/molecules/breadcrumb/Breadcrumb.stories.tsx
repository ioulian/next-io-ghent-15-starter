import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Link from "next/link";

import { expect, userEvent, within } from "storybook/test";

import Button from "@/components/atoms/button/Button";

import Breadcrumb from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button1"));
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button2"));
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button3"));
    await userEvent.tab();
    await expect(document.activeElement).toBe(canvas.getByTestId("button4"));
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <Button href={{ pathname: "/" }} as={Link} size="base" variant="simple" data-testid="button1">
        Home
      </Button>
      <Button href={{ pathname: "/parent-1" }} as={Link} size="base" variant="simple" data-testid="button2">
        Parent 1
      </Button>
      <Button href={{ pathname: "/parent-2" }} as={Link} size="base" variant="simple" data-testid="button3">
        Parent 2
      </Button>
      <Button href={{ pathname: "/current" }} as={Link} size="base" variant="simple" data-testid="button4">
        Current
      </Button>
    </Breadcrumb>
  ),
};
