import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import SingleToggle from "./SingleToggle";

const meta: Meta<typeof SingleToggle> = {
  title: "UI/Atoms/Form/Single Toggle",
  component: SingleToggle,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SingleToggle>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Toggle</label>
      </VisuallyHidden>
      <SingleToggle {...args} id={args.id} />
    </>
  ),
  args: { id: "toggle" },
};
