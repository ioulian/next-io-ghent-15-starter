import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Atoms/Form/Select",
  component: Select,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Select field</label>
      </VisuallyHidden>
      <Select {...args} id={args.id} />
    </>
  ),
  args: {
    id: "select-field",
    addEmptyOption: true,
    children: (
      <>
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </>
    ),
  },
};
