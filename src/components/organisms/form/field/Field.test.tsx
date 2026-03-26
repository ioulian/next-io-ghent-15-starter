import Input from "@/components/atoms/form/input/Input";
import Form from "@/components/organisms/form/Form";
import { render, screen } from "@/test/test-utils";

import Field from "./Field";

describe("Field", () => {
  it("renders", () => {
    render(
      <Form>
        <Field data-testid="test" name="test" />
      </Form>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Form>
        <Field data-testid="test" className="test" name="test" />
      </Form>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <Form>
        <Field data-testid="test" data-foo="bar" name="test" />
      </Form>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with label", () => {
    render(
      <Form>
        <Field label="test" name="test" />
      </Form>,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("renders inputfield with correct values", async () => {
    render(
      <Form formSettings={{ defaultValues: { "test-name": "test-value" } }}>
        <Field name="test-name" description="test-description">
          <Input data-testid="test" />
        </Field>
      </Form>,
    );

    expect(screen.getByTestId("test")).toHaveAttribute("name", "test-name");
    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("test-value");
    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("test-value");
    expect(screen.queryByText("test-description")).toBeInTheDocument();
  });

  it("renders custom render function", async () => {
    render(
      <Form formSettings={{ defaultValues: { "test-name": "test-value" } }}>
        <Field name="test-name" description="test-description">
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ field, props: { isError, ...props } }) => <span data-testid="test" {...field} {...props} />
          }
        </Field>
      </Form>,
    );

    expect(screen.getByTestId("test")).toHaveAttribute("name", "test-name");
  });

  it("renders as fieldset", async () => {
    render(
      <Form formSettings={{ defaultValues: { "test-name": "test-value" } }}>
        <Field name="test-name" asFieldSet data-testid="test" label="Test label" />
      </Form>,
    );

    expect(screen.getByTestId("test").tagName).toBe("FIELDSET");
    expect(screen.getByText("Test label").tagName).toBe("LEGEND");
  });

  it("renders required label", async () => {
    render(
      <Form formSettings={{ defaultValues: { "test-name": "test-value" } }}>
        <Field name="test-name" required data-testid="test" label="Test label" />
      </Form>,
    );

    expect(screen.getByText("Test label").innerHTML).toContain("*");
  });
});
