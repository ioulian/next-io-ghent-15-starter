/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { wait } from "@/utils/promises";
import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Expandable from "@/components/molecules/expandable/Expandable";

import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Organisms/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion>
        <Expandable summary="Accordion item 1">
          <p>Accordion content 1</p>
        </Expandable>
        <Expandable summary="Accordion item 2">
          <p>Accordion content 2</p>
        </Expandable>
        <Expandable summary="Accordion item 3">
          <p>Accordion content 3</p>
        </Expandable>
      </Accordion>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Accordion item 1"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByText("Accordion content 1")).toBeVisible();
    await expect(canvas.getByText("Accordion content 2")).not.toBeVisible();
    await expect(canvas.getByText("Accordion content 3")).not.toBeVisible();

    await userEvent.click(canvas.getByText("Accordion item 2"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByText("Accordion content 1")).not.toBeVisible();
    await expect(canvas.getByText("Accordion content 2")).toBeVisible();
    await expect(canvas.getByText("Accordion content 3")).not.toBeVisible();

    await userEvent.click(canvas.getByText("Accordion item 3"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByText("Accordion content 1")).not.toBeVisible();
    await expect(canvas.getByText("Accordion content 2")).not.toBeVisible();
    await expect(canvas.getByText("Accordion content 3")).toBeVisible();
  },
};
