/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { z, ZodType } from "zod";

import Input from "@/components/atoms/form/input/Input";
import SingleCheckbox from "@/components/atoms/form/single-checkbox/SingleCheckbox";
import PasswordInput from "@/components/atoms/form/password/PasswordInput";
import List from "@/components/atoms/form/collection/List";
import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";
import FormField from "@/components/molecules/form-field/FormField";
import Heading from "@/components/atoms/heading/Heading";
import Button from "@/components/atoms/button/Button";
import { createZodResolver } from "@/components/organisms/form/validation";

import Form from "./Form";

const meta: Meta<typeof Form> = {
  title: "UI/Organisms/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

type SampleFormData = {
  firstName: string;
  lastName?: string | null;
  emailAddress: string;
  hobbies: string[];
  //color: ColourOption;
  password: string;
  passwordRepeat: string;
  privacy: boolean;
};

const REQUIRED_MESSAGE = "This field is required";
const BASIC_STRING_VALIDATION = z.string({
  required_error: REQUIRED_MESSAGE,
  invalid_type_error: REQUIRED_MESSAGE,
});

export const schema: ZodType<SampleFormData> = z
  .object({
    firstName: BASIC_STRING_VALIDATION.min(1),
    lastName: BASIC_STRING_VALIDATION.nullish(),
    emailAddress: BASIC_STRING_VALIDATION.email("This is not a valid email."),
    hobbies: z
      .array(z.string(), {
        required_error: REQUIRED_MESSAGE,
        invalid_type_error: REQUIRED_MESSAGE,
      })
      .min(1, "Select at least one"),
    password: BASIC_STRING_VALIDATION.min(6),
    passwordRepeat: BASIC_STRING_VALIDATION.min(6),
    privacy: z.boolean(),
  })
  .refine((obj) => obj.password === obj.passwordRepeat, {
    message: "Passwords must match!",
    path: ["passwordRepeat"],
  });

export const formResolver = createZodResolver(schema);

export const Default: Story = {
  render: () => (
    <Form<SampleFormData>
      formSettings={{ defaultValues: {}, resolver: formResolver }}
      onSubmit={action("onSubmit")}
      onChange={action("onChange")}
      onError={action("onError")}
    >
      <Heading>Register here</Heading>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1.25rem",
        }}
      >
        <FormField<SampleFormData>
          style={{
            flexGrow: 1,
          }}
          label="First name"
          name="firstName"
          required
        >
          <Input />
        </FormField>
        <FormField<SampleFormData>
          style={{
            flexGrow: 1,
          }}
          label="Last name"
          name="lastName"
        >
          <Input />
        </FormField>
      </div>
      <FormField<SampleFormData> label="Email address" name="emailAddress" required>
        <Input type="email" />
      </FormField>
      <FormField<SampleFormData>
        label="Hobbies"
        name="hobbies"
        asFieldSet
        inputWrapper={List}
        required
      >
        <Checkbox key="1" inputValue="value1">
          Value 1
        </Checkbox>
        <Checkbox key="2" inputValue="value2">
          Value 2
        </Checkbox>
        <Checkbox key="3" inputValue="value3">
          Value 3
        </Checkbox>
      </FormField>

      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1.25rem",
        }}
      >
        <FormField<SampleFormData>
          style={{
            flexGrow: 1,
          }}
          label="Password"
          name="password"
          description="At least 8 chars, lowercase, uppercase, special char and number"
          required
        >
          <PasswordInput />
        </FormField>
        <FormField<SampleFormData>
          style={{
            flexGrow: 1,
          }}
          label="Repeat password"
          name="passwordRepeat"
          required
        >
          <Input type="password" />
        </FormField>
      </div>
      <FormField<SampleFormData>
        label="I accept privacy policy"
        description="Read terms and conditions first"
        name="privacy"
        isToggle
      >
        <SingleCheckbox />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  ),
  args: {},
};
