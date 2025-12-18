import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI/Atoms/Form/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Toggle</label>
      </VisuallyHidden>
      <Toggle {...args} id={args.id} />
    </>
  ),
  args: { id: "toggle" },
};
