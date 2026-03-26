import { userEvent } from "storybook/test";
import { z } from "zod";

import Input from "@/components/atoms/form/input/Input";
import { exampleErrors } from "@/components/organisms/form/Form.data";
import describeGeneralTests from "@/test/general-tests";
import { act, fireEvent, render, screen } from "@/test/test-utils";

import Field from "./field/Field";
import Form from "./Form";
import { createValidationMessage, createZodResolver } from "./Form.validation";

describe("Form", () => {
  describeGeneralTests(<Form />, () => ({ render }));

  it("will handle form flow", async () => {
    const spy = vi.fn();
    render(
      <Form
        onSubmit={spy}
        formSettings={{
          resolver: createZodResolver(
            z.object({
              "test-name": z.string().trim().min(1, createValidationMessage("common.form.validationErrors.required")),
            }),
          ),
        }}
        data-testid="test"
        noValidate
      >
        <Field name="test-name" required description="test">
          <Input />
        </Field>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      await fireEvent.click(button);
    });
    expect(spy).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-describedby");
    expect(input).toHaveAttribute("aria-invalid");
    expect(document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[0]!)).toBeInTheDocument();
    expect(document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[1]!)).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(input, "test");
      await fireEvent.click(button);
    });

    expect(spy).toHaveBeenCalled();
  });

  it("will handle form custom errors", async () => {
    const spy = vi.fn();
    render(
      <Form onSubmit={spy} data-testid="test" fieldErrors={exampleErrors}>
        <Field name="emailAddress">
          <Input />
        </Field>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-describedby");
    expect(document.getElementById(input.getAttribute("aria-describedby")!)).toBeInTheDocument();
  });

  it("triggers onChange", async () => {
    const spy = vi.fn((data) => data.emailAddress);
    render(
      <Form data-testid="test" onChange={spy}>
        <Field name="emailAddress">
          <Input />
        </Field>
      </Form>,
    );

    const input = screen.getByRole("textbox");

    await act(async () => {
      await userEvent.type(input, "test");
    });

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.results[spy.mock.results.length - 1]!.value).toBe("test");
  });

  it("should not trigger onSubmit when loading", async () => {
    const spy = vi.fn();
    render(
      <Form onSubmit={spy} data-testid="test" isLoading>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    );

    const button = screen.getByRole("button");

    await act(async () => {
      try {
        await fireEvent.click(button);
        // eslint-disable-next-line sonarjs/no-ignored-exceptions, @typescript-eslint/no-unused-vars
      } catch (e) {}
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
