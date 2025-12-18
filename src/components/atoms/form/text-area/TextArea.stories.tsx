import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "UI/Atoms/Form/Text Area",
  component: TextArea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Text area</label>
      </VisuallyHidden>
      <TextArea {...args} id={args.id} />
    </>
  ),
  args: { id: "text-area" },
};
