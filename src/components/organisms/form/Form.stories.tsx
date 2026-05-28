import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { FC } from "react";
import type { ZodType } from "zod";

import { useTranslations } from "next-intl";
import { expect, fn, userEvent, within } from "storybook/test";
import { z } from "zod";

import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";
import ButtonGroup from "@/components/molecules/button-group/ButtonGroup";
import { wait } from "@/utils/promises";

import Form from "./Form";
import { focusOnFirstError, useAppForm } from "./Form.utils";
import InputList from "./input-list/InputList";

const meta: Meta<typeof Form> = {
  title: "UI/Organisms/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

type SampleFormData = {
  firstName: string;
  lastName?: string;
  emailAddress: string;
  password: string;
  passwordRepeat: string;
  privacyPolicy: boolean;
  hobbies: string[];
  selectOne: "1" | "2" | "3";
};

// Do not use translations like this, better option would be: https://zod.dev/error-customization?id=global-error-customization#global-error-customization
const getSchema = (t: ReturnType<typeof useTranslations>) => {
  const REQUIRED_MESSAGE = {
    // @ts-expect-error - Ignore
    message: t("common.form.validationErrors.required"),
  };
  const EMAIL_MESSAGE = {
    // @ts-expect-error - Ignore
    message: t("common.form.validationErrors.email"),
  };
  const BASIC_STRING_VALIDATION = z.string(REQUIRED_MESSAGE);

  const schema: ZodType<SampleFormData, SampleFormData> = z
    .object({
      firstName: BASIC_STRING_VALIDATION.min(1, REQUIRED_MESSAGE),
      lastName: BASIC_STRING_VALIDATION.optional(),
      emailAddress: z.email(EMAIL_MESSAGE),
      selectOne: z.enum(["1", "2", "3"], REQUIRED_MESSAGE),
      hobbies: z.array(z.string(), REQUIRED_MESSAGE).min(1, REQUIRED_MESSAGE),
      password: BASIC_STRING_VALIDATION.min(6, {
        // @ts-expect-error - Ignore
        message: t("common.form.validationErrors.password"),
      }),
      passwordRepeat: BASIC_STRING_VALIDATION.min(6, {
        // @ts-expect-error - Ignore
        message: t("common.form.validationErrors.password"),
      }),
      privacyPolicy: z.boolean(),
    })
    .refine((obj) => obj.password === obj.passwordRepeat, {
      // @ts-expect-error - Ignore
      message: t("common.form.validationErrors.passwordMatch"),
      path: ["passwordRepeat"],
    })
    .refine((obj) => obj.privacyPolicy, {
      message: "Privacy policy is required",
      path: ["privacyPolicy"],
    });

  return schema;
};

const onSubmitCallback = fn();
const onErrorCallback = fn();

const ASYNC_DELAY = 1000;

const SampleForm: FC = () => {
  const t = useTranslations();
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: undefined,
      emailAddress: "",
      password: "",
      passwordRepeat: "",
      privacyPolicy: false,
    } as SampleFormData,
    validators: {
      onSubmit: getSchema(t),
    },
    onSubmitInvalid() {
      focusOnFirstError();
      onErrorCallback();
    },
    onSubmit: async ({ value }) => {
      await wait(ASYNC_DELAY);
      onSubmitCallback();
      console.log(value);
    },
  });

  return (
    <form.AppForm>
      <Form>
        <Heading>Register here</Heading>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "1.25rem",
          }}
        >
          <form.AppField name="firstName">
            {(field) => (
              <field.InputField label="First name" required>
                <field.InputText data-testid="firstName" />
              </field.InputField>
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => (
              <field.InputField label="Last name">
                <field.InputText />
              </field.InputField>
            )}
          </form.AppField>
        </div>
        <form.AppField name="emailAddress">
          {(field) => (
            <field.InputField label="Email address" required>
              <field.InputText data-testid="emailAddress" />
            </field.InputField>
          )}
        </form.AppField>
        <form.AppField name="hobbies">
          {(field) => (
            <field.InputField label="Hobbies" asFieldSet required>
              <InputList>
                <field.InputCheckbox value="1" label="Hobby 1" data-testid="firstCheckbox" />
                <field.InputCheckbox value="2" label="Hobby 2" />
                <field.InputCheckbox value="3" label="Hobby 3" />
              </InputList>
            </field.InputField>
          )}
        </form.AppField>
        <form.AppField name="selectOne">
          {(field) => (
            <field.InputField label="Select one" asFieldSet required>
              <InputList>
                <field.InputRadio value="1" label="Option 1" data-testid="firstRadio" />
                <field.InputRadio value="2" label="Option 2" />
                <field.InputRadio value="3" label="Option 3" />
              </InputList>
            </field.InputField>
          )}
        </form.AppField>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "1.25rem",
          }}
        >
          <form.AppField name="password">
            {(field) => (
              <field.InputField label="Password" required>
                <field.InputPassword data-testid="password" />
              </field.InputField>
            )}
          </form.AppField>
          <form.AppField name="passwordRepeat">
            {(field) => (
              <field.InputField label="Password repeat" required>
                <field.InputText type="password" data-testid="passwordRepeat" />
              </field.InputField>
            )}
          </form.AppField>
        </div>
        <form.AppField name="privacyPolicy">
          {(field) => (
            <field.InputField label="I accept the privacy policy" passLabelToChildren required>
              <field.InputBooleanCheckbox data-testid="privacy" />
            </field.InputField>
          )}
        </form.AppField>
        <ButtonGroup>
          <form.Submit>
            {(canSubmit, isSubmitting, isFormValidating) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting || isFormValidating}
                data-testid="submit-button"
              >
                Submit
              </Button>
            )}
          </form.Submit>
          <form.Reset>
            {(reset, canReset) => (
              <Button type="reset" disabled={!canReset} onClick={reset} variant="secondary">
                Reset
              </Button>
            )}
          </form.Reset>
        </ButtonGroup>
      </Form>
    </form.AppForm>
  );
};

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Fill in form but not completely", async () => {
      await userEvent.type(canvas.getByTestId("firstName"), "Yulian");
      await userEvent.type(canvas.getByTestId("emailAddress"), "myemail");
    });

    await step("Submit form", async () => {
      await userEvent.click(canvas.getByTestId("submit-button"));
      await expect(onErrorCallback).toBeCalled();
      await expect(onSubmitCallback).not.toBeCalled();
    });

    await step("Check for errors", async () => {
      await expect(canvas.getByTestId("emailAddress")).toHaveAttribute("aria-invalid", "true");
    });

    await step("Fill in form correctly", async () => {
      await userEvent.type(canvas.getByTestId("emailAddress"), "@domain.com");
      await userEvent.click(canvas.getByTestId("firstCheckbox"));
      await userEvent.click(canvas.getByTestId("firstRadio"));
      await userEvent.type(canvas.getByTestId("password"), "foobar");
      await userEvent.type(canvas.getByTestId("passwordRepeat"), "foobar");
      await userEvent.click(canvas.getByTestId("privacy"));
    });

    await step("Submit form again", async () => {
      await userEvent.click(canvas.getByTestId("submit-button"));
      await wait(ASYNC_DELAY + 100);
      await expect(onSubmitCallback).toBeCalled();
      await expect(onErrorCallback).toHaveBeenCalledTimes(1); // Previous call when form was invalid
    });
  },
  render: (args) => <SampleForm {...args} />,
  args: {},
};
