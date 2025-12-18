import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { action } from "storybook/actions";
import { expect, userEvent, within } from "storybook/test";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import { wait } from "@/utils/promises";

import Expandable from "./Expandable";

const meta: Meta<typeof Expandable> = {
  title: "UI/Molecules/Expandable",
  component: Expandable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Expandable>;

export const Default: Story = {
  args: {
    onToggle: action("onToggle"),
    summary: "Click to expand",
    children: "More details ...",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Expandable open", async () => {
      await userEvent.click(canvas.getByText("Click to expand"));
      await wait(getVariableAsNumber("duration.slow"));
      await expect(canvas.getByText("More details ...")).toBeVisible();
    });

    await step("Expandable close", async () => {
      await userEvent.click(canvas.getByText("Click to expand"));
      await wait(getVariableAsNumber("duration.slow"));
      await expect(canvas.getByText("More details ...")).not.toBeVisible();
    });
  },
};

export const OpenByDefault: Story = {
  args: {
    open: true,
    onToggle: action("onToggle"),
    summary: "Click to expand",
    children: "More details ...",
  },
};
