import type { Meta, StoryObj } from "@storybook/nextjs";

import { expect, fn, userEvent, within } from "storybook/test";
import { z, ZodType } from "zod";

import Button from "@/components/atoms/button/Button";
import Checkbox from "@/components/atoms/form/collection/checkbox/Checkbox";
import List from "@/components/atoms/form/collection/List";
import Input from "@/components/atoms/form/input/Input";
import PasswordInput from "@/components/atoms/form/password/PasswordInput";
import SingleCheckbox from "@/components/atoms/form/single-checkbox/SingleCheckbox";
import Heading from "@/components/atoms/heading/Heading";
import FormField from "@/components/molecules/form-field/FormField";
import { createZodResolver } from "@/components/organisms/form/validation";
import { wait } from "@/utils/promises";

import Form from "./Form";

const meta: Meta<typeof Form> = {
  title: "UI/Organisms/Form",
  component: Form,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    onError: fn(),
    onChange: fn(),
  },
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
const EMAIL_MESSAGE = "This is not a valid email";
const BASIC_STRING_VALIDATION = z.string(REQUIRED_MESSAGE);

const schema: ZodType<SampleFormData, SampleFormData> = z
  .object({
    firstName: BASIC_STRING_VALIDATION.min(1),
    lastName: BASIC_STRING_VALIDATION.nullish(),
    emailAddress: z.email(EMAIL_MESSAGE),
    hobbies: z.array(z.string(), REQUIRED_MESSAGE).min(1, "Select at least one"),
    password: BASIC_STRING_VALIDATION.min(6),
    passwordRepeat: BASIC_STRING_VALIDATION.min(6),
    privacy: z.boolean(),
  })
  .refine((obj) => obj.password === obj.passwordRepeat, {
    message: "Passwords must match!",
    path: ["passwordRepeat"],
  });

export const Default: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Fill in form but not completely", async () => {
      await userEvent.type(canvas.getByTestId("firstName"), "Yulian");
      await userEvent.type(canvas.getByTestId("emailAddress"), "myemail");

      // Wait a bit for react hook form to pickup changes
      await wait(100);
    });

    await step("Submit form", async () => {
      await userEvent.click(canvas.getByTestId("submit-button"));
      await expect(args.onError).toBeCalled();
      await expect(args.onSubmit).not.toBeCalled();
    });

    await step("Check for errors", async () => {
      await expect(canvas.getByText(EMAIL_MESSAGE)).toBeInTheDocument();
      await expect(canvas.getByText(REQUIRED_MESSAGE)).toBeInTheDocument();
    });

    await step("Fill in form correctly", async () => {
      await userEvent.type(canvas.getByTestId("emailAddress"), "@domain.com");
      await userEvent.click(canvas.getByTestId("firstCheckbox"));
      await userEvent.type(canvas.getByTestId("password"), "foobar");
      await userEvent.type(canvas.getByTestId("passwordRepeat"), "foobar");

      // Wait a bit for react hook form to pickup changes
      await wait(100);
    });

    await step("Submit form again", async () => {
      await userEvent.click(canvas.getByTestId("submit-button"));
      await expect(args.onSubmit).toBeCalled();
      await expect(args.onError).toHaveBeenCalledTimes(1); // Previous call when form was invalid
    });
  },
  render: (args) => (
    <Form<SampleFormData>
      formSettings={{
        defaultValues: {},
        resolver: createZodResolver(schema),
      }}
      onSubmit={args.onSubmit}
      onChange={args.onChange}
      onError={args.onError}
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
          <Input data-testid="firstName" />
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
        <Input type="email" data-testid="emailAddress" />
      </FormField>
      <FormField<SampleFormData> label="Hobbies" name="hobbies" asFieldSet inputWrapper={List} required>
        <Checkbox key="1" inputValue="value1" data-testid="firstCheckbox">
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
          <PasswordInput data-testid="password" />
        </FormField>
        <FormField<SampleFormData>
          style={{
            flexGrow: 1,
          }}
          label="Repeat password"
          name="passwordRepeat"
          required
        >
          <Input type="password" data-testid="passwordRepeat" />
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
      <Button type="submit" data-testid="submit-button">
        Submit
      </Button>
    </Form>
  ),
  args: {},
};
