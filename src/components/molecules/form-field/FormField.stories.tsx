import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { cloneElement, isValidElement } from "react";

import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";
import List from "@/components/atoms/form/collection/List";
import Radio from "@/components/atoms/form/collection/radio/Radio";
import Toggle from "@/components/atoms/form/collection/toggle/Toggle";
import Description from "@/components/atoms/form/description/Description";
import FieldError from "@/components/atoms/form/field-error/FieldError";
import Input from "@/components/atoms/form/input/Input";
import Label from "@/components/atoms/form/label/Label";
import PasswordInput from "@/components/atoms/form/password/PasswordInput";

import FormField from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "UI/Molecules/Form field",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  render: (args) => {
    const id = "test";
    const errorId = "test-error";
    const descriptionId = "test-description";
    const name = "test";

    return (
      <FormField {...args}>
        <Label htmlFor={id}>Label</Label>
        {isValidElement<Record<string, unknown>>(args.children)
          ? cloneElement(args.children, { id, "aria-describedby": [descriptionId, errorId].join(" "), name })
          : null}
        <FieldError id={errorId}>Example error</FieldError>
        <Description id={descriptionId}>Example description</Description>
      </FormField>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    children: <Input />,
  },
};

export const WithPasswordStrengthMeter: Story = {
  args: {
    children: <PasswordInput showStrengthMeter />,
  },
};

export const IsDisabled: Story = {
  args: {
    disabled: true,
    children: <Input />,
  },
};

export const WithCheckbox: Story = {
  render: (args) => {
    const id = "test";
    const descriptionId = "test-description";

    return (
      <FormField {...args}>
        <Checkbox value="value1" id={id} aria-describedby={descriptionId}>
          Value 1
        </Checkbox>
        <Description id={descriptionId}>Example description</Description>
      </FormField>
    );
  },
};

export const WithToggle: Story = {
  render: (args) => {
    const id = "test";
    const descriptionId = "test-description";

    return (
      <FormField {...args}>
        <Toggle value="value1" id={id} aria-describedby={descriptionId}>
          Value 1
        </Toggle>
        <Description id={descriptionId}>Example description</Description>
      </FormField>
    );
  },
};

export const WithRadioList: Story = {
  render: () => (
    <List>
      <Radio value="value1">Value 1</Radio>
      <Radio value="value2">Value 2</Radio>
      <Radio value="value3">Value 3</Radio>
    </List>
  ),
};

export const WithCheckboxList: Story = {
  render: () => (
    <List>
      <Checkbox value="value1">Value 1</Checkbox>
      <Checkbox value="value2">Value 2</Checkbox>
      <Checkbox value="value3">Value 3</Checkbox>
    </List>
  ),
};
