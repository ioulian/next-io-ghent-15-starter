import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import Input from "./Input";

const options = [
  "text",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "month",
  "number",
  "password",
  "radio",
  "search",
  "tel",
  "time",
  "url",
  "week",
];

const meta: Meta<typeof Input> = {
  title: "UI/Atoms/Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options,
      control: {
        type: "select",
        labels: options,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Input field</label>
      </VisuallyHidden>
      <Input {...args} id={args.id} />
    </>
  ),
  args: {
    type: "text",
    id: "input-field",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>Input field</label>
      </VisuallyHidden>
      <Input {...args} id={args.id} />
    </>
  ),
  args: {
    type: "search",
    iconBefore: <SvgSprite name="tablerSearch" />,
    id: "input-field-with-icon",
  },
};
