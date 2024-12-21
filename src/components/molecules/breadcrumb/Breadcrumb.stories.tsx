/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import { userEvent, within, expect } from "@storybook/test";

import LinkButton from "@/components/atoms/link-button/LinkButton";

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
      <LinkButton href="/" as={Link} size="base" variant="simple" data-testid="button1">
        Home
      </LinkButton>
      <LinkButton href="/parent-1" as={Link} size="base" variant="simple" data-testid="button2">
        Parent 1
      </LinkButton>
      <LinkButton href="/parent-2" as={Link} size="base" variant="simple" data-testid="button3">
        Parent 2
      </LinkButton>
      <LinkButton href="/current" as={Link} size="base" variant="simple" data-testid="button4">
        Current
      </LinkButton>
    </Breadcrumb>
  ),
};
