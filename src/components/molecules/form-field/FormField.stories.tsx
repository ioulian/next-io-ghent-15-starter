/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import Form from "@/components/organisms/form/Form";
import { exampleErrors } from "@/components/organisms/form/data";
import Input from "@/components/atoms/form/input/Input";
import Toggle from "@/components/atoms/form/toggle/Toggle";
import SingleCheckbox from "@/components/atoms/form/single-checkbox/SingleCheckbox";
import PasswordInput from "@/components/atoms/form/password/PasswordInput";
import Radio from "@/components/atoms/form/collection/radio/Radio";
import List from "@/components/atoms/form/collection/List";
import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";

import FormField from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "UI/Molecules/Form field",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
    controls: { include: ["label", "name", "required"] },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    description: "Description",
    children: <Input />,
  },
};

export const WithPasswordStrengthMeter: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    description: "Description",
    children: <PasswordInput showStrengthMeter />,
  },
};

export const WithError: Story = {
  render: (args) => (
    <Form fieldErrors={exampleErrors}>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    description: "Description",
    children: <Input />,
  },
};

export const IsDisabled: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    disabled: true,
    description: "Description",
    children: <Input />,
  },
};

export const IsToggleWithCheckbox: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    isToggle: true,
    description: "Description",
    children: <SingleCheckbox />,
  },
};

export const IsToggleWithToggle: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} />
    </Form>
  ),
  args: {
    label: "Input field",
    name: "emailAddress",
    required: true,
    isToggle: true,
    description: "Description",
    children: <Toggle />,
  },
};

export const WithRadioList: Story = {
  render: (args) => (
    <Form>
      <FormField {...args}>
        <Radio inputValue="value1">Value 1</Radio>
        <Radio inputValue="value2">Value 2</Radio>
        <Radio inputValue="value3">Value 3</Radio>
      </FormField>
    </Form>
  ),
  args: {
    label: "Choose one",
    name: "emailAddress",
    inputWrapper: List,
    asFieldSet: true,
  },
};

export const WithCheckboxList: Story = {
  render: (args) => (
    <Form>
      <FormField {...args}>
        <Checkbox inputValue="value1">Value 1</Checkbox>
        <Checkbox inputValue="value2">Value 2</Checkbox>
        <Checkbox inputValue="value3">Value 3</Checkbox>
      </FormField>
    </Form>
  ),
  args: {
    label: "Choose one",
    name: "emailAddress",
    inputWrapper: List,
    asFieldSet: true,
  },
};
