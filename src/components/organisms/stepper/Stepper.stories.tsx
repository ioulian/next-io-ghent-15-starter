import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useState } from "react";

import { expect, userEvent, within } from "storybook/test";

import Step from "./Step";
import Stepper from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "UI/Organisms/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const StoryView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (index: number) => () => {
    setCurrentStep(index);
  };

  return (
    <Stepper>
      <Step
        index={0}
        isCurrent={currentStep === 0}
        onClick={handleStepClick(0)}
        isDone={currentStep > 0}
        data-testid="step-1"
      >
        Step 1
      </Step>
      <Step
        index={1}
        isCurrent={currentStep === 1}
        onClick={handleStepClick(1)}
        isDone={currentStep > 1}
        data-testid="step-2"
      >
        Step 2
      </Step>
      <Step
        index={2}
        isCurrent={currentStep === 2}
        onClick={handleStepClick(2)}
        isDone={currentStep > 2}
        data-testid="step-3"
      >
        Step 3
      </Step>
    </Stepper>
  );
};

export const Default: Story = {
  render: () => <StoryView />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.click(document.activeElement as HTMLElement);
    await expect(canvas.getByTestId("step-1")).toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-2")).not.toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-3")).not.toHaveAttribute("aria-current", "step");
    await userEvent.tab();
    await userEvent.click(document.activeElement as HTMLElement);
    await expect(canvas.getByTestId("step-1")).not.toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-2")).toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-3")).not.toHaveAttribute("aria-current", "step");
    await userEvent.tab();
    await userEvent.click(document.activeElement as HTMLElement);
    await expect(canvas.getByTestId("step-1")).not.toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-2")).not.toHaveAttribute("aria-current", "step");
    await expect(canvas.getByTestId("step-3")).toHaveAttribute("aria-current", "step");
  },
};
