import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { FC, ReactNode } from "react";
import type { ZodType } from "zod";

import { z } from "zod";

import Form from "../Form";
import { useAppForm } from "../Form.utils";
import InputList from "../input-list/InputList";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "UI/Organisms/Form/Field",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

type SampleFormData = {
  test: string;
};

const schema: ZodType<SampleFormData, SampleFormData> = z.object({
  test: z.any(),
});

const SampleForm: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode;
  value?: string;
}> = ({ value, children }) => {
  const form = useAppForm({
    defaultValues: {
      test: value,
    } as SampleFormData,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form.AppForm>
      <Form>
        <form.AppField name="test">{(field) => children(field)}</form.AppField>
      </Form>
    </form.AppForm>
  );
};

export const Default: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <field.InputText />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    description: "Description",
    required: true,
  },
};

export const IsDisabled: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <field.InputText />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    description: "Description",
    required: true,
    disabled: true,
  },
};

export const WithTextArea: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <field.InputTextArea />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    description: "Description",
    required: true,
  },
};

export const WithPasswordStrengthMeter: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <field.InputPassword showStrengthMeter />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    description: "Description",
    required: true,
  },
};

export const WithBooleanCheckbox: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args} passLabelToChildren>
          <field.InputBooleanCheckbox />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "I accept the privacy policy",
    required: true,
  },
};

export const WithBooleanToggle: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args} passLabelToChildren>
          <field.InputBooleanToggle />
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Turn on the lights",
    required: true,
  },
};

export const WithCheckboxList: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <InputList>
            <field.InputCheckbox value="1" label="Option 1" />
            <field.InputCheckbox value="2" label="Option 2" />
            <field.InputCheckbox value="3" label="Option 3" />
          </InputList>
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    required: true,
  },
};

export const WithToggleList: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <InputList>
            <field.InputToggle value="1" label="Option 1" />
            <field.InputToggle value="2" label="Option 2" />
            <field.InputToggle value="3" label="Option 3" />
          </InputList>
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    required: true,
  },
};

export const WithRadioList: Story = {
  render: (args) => (
    <SampleForm>
      {(field) => (
        <field.InputField {...args}>
          <InputList>
            <field.InputRadio value="1" label="Option 1" />
            <field.InputRadio value="2" label="Option 2" />
            <field.InputRadio value="3" label="Option 3" />
          </InputList>
        </field.InputField>
      )}
    </SampleForm>
  ),
  args: {
    label: "Label",
    required: true,
  },
};

export const WithRichText: Story = {
  render: (args) => (
    <SampleForm value="<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6><hr /><p>Paragraph 1</p><p>Paragraph 2</p><ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul><p>Paragraph 2</p><ol><li>List item 1</li><li>List item 2</li><li>List item 3</li></ol>">
      {(field) => (
        <field.InputField {...args}>
          <field.InputRichText />
        </field.InputField>
      )}
    </SampleForm>
  ),
};
