import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import SingleCheckbox from "./SingleCheckbox";

const meta: Meta<typeof SingleCheckbox> = {
  title: "UI/Atoms/Form/Single Checkbox",
  component: SingleCheckbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SingleCheckbox>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Single checkbox</label>
      </VisuallyHidden>
      <SingleCheckbox {...args} id={args.id} />
    </>
  ),
  args: {
    id: "single-checkbox",
  },
};

export const Indeterminate: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Single checkbox</label>
      </VisuallyHidden>
      <SingleCheckbox {...args} id={args.id} />
    </>
  ),
  args: {
    id: "single-checkbox-indeterminate",
    checked: false,
    indeterminate: true,
  },
};
