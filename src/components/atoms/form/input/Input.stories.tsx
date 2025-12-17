import type { Meta, StoryObj } from "@storybook/nextjs";

import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";

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
  render: (args) => <Input {...args} />,
  args: {
    type: "text",
  },
};

export const WithIcon: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "search",
    iconBefore: <SvgSprite name="tablerSearch" />,
  },
};
