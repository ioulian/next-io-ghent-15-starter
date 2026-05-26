import type { ComponentPropsWithRef, FC } from "react";
import type { ZodType } from "zod";

import { userEvent } from "storybook/test";
import { z } from "zod";

import describeGeneralTests from "@/test/general-tests";
import { act, fireEvent, render, screen } from "@/test/test-utils";

import Form from "./Form";
import { focusOnFirstError, useAppForm } from "./Form.utils";

type TestFormData = {
  test: string;
};

const schema: ZodType<TestFormData, TestFormData> = z.object({
  test: z.string({ message: "Error" }).trim().min(1, { message: "Error" }),
});

const SampleForm: FC<{ onSubmit?: () => void; onError?: () => void } & ComponentPropsWithRef<typeof Form>> = ({
  onSubmit,
  onError,
  ...props
}) => {
  const form = useAppForm({
    defaultValues: { test: "" } as TestFormData,
    validators: {
      onSubmit: schema,
    },
    onSubmitInvalid() {
      focusOnFirstError();
      onError?.();
    },
    onSubmit: async () => {
      onSubmit?.();
    },
  });

  return (
    <form.AppForm>
      <Form {...props}>
        <form.AppField name="test">
          {(field) => (
            <field.InputField label="Test" description="Test description" required>
              <field.InputText />
            </field.InputField>
          )}
        </form.AppField>
        <form.Submit>
          {(canSubmit) => (
            <button type="submit" disabled={!canSubmit} data-testid="submit-button">
              Submit
            </button>
          )}
        </form.Submit>
      </Form>
    </form.AppForm>
  );
};

describe("Form", () => {
  describeGeneralTests(<SampleForm />, () => ({ render }));

  it("will handle form flow", async () => {
    const onSubmitSpy = vi.fn();
    const onErrorSpy = vi.fn();
    render(<SampleForm onSubmit={onSubmitSpy} onError={onErrorSpy} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      await fireEvent.click(button);
    });
    expect(onSubmitSpy).not.toHaveBeenCalled();
    expect(onErrorSpy).toHaveBeenCalled();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-describedby");
    expect(input).toHaveAttribute("aria-invalid");
    expect(document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[0]!)).toBeInTheDocument();
    expect(document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[1]!)).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(input, "test");
      await fireEvent.click(button);
    });

    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
