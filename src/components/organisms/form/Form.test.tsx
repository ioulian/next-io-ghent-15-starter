/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@storybook/test";
import { z } from "zod";

import Input from "@/components/atoms/form/input/Input";
import { exampleErrors } from "@/components/organisms/form/data";
import FormField from "@/components/molecules/form-field/FormField";
import describeGeneralTests from "@/test/generalTests";

import { createValidationMessage, createZodResolver } from "./validation";
import Form from "./Form";

describe("Form", () => {
  describeGeneralTests(<Form />, () => ({ render }));

  it("will handle form flow", async () => {
    const spy = jest.fn();
    render(
      <Form
        onSubmit={spy}
        formSettings={{
          resolver: createZodResolver(
            z.object({
              "test-name": z
                .string()
                .trim()
                .min(1, createValidationMessage("common.form.validationErrors.required")),
            }),
          ),
        }}
        data-testid="test"
        noValidate
      >
        <FormField name="test-name" required description="test">
          <Input />
        </FormField>
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
    expect(
      document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[0]),
    ).toBeInTheDocument();
    expect(
      document.getElementById(input.getAttribute("aria-describedby")!.split(" ")[1]),
    ).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(input, "test");
      await fireEvent.click(button);
    });

    expect(spy).toHaveBeenCalled();
  });

  it("will handle form custom errors", async () => {
    const spy = jest.fn();
    render(
      <Form onSubmit={spy} data-testid="test" fieldErrors={exampleErrors}>
        <FormField name="emailAddress">
          <Input />
        </FormField>
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
    const spy = jest.fn((data) => data.emailAddress);
    render(
      <Form data-testid="test" onChange={spy}>
        <FormField name="emailAddress">
          <Input />
        </FormField>
      </Form>,
    );

    const input = screen.getByRole("textbox");

    await act(async () => {
      await userEvent.type(input, "test");
    });

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.results[spy.mock.results.length - 1].value).toBe("test");
  });

  it("should not trigger onSubmit when loading", async () => {
    const spy = jest.fn();
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
