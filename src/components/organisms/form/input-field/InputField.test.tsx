import type { FC, ReactNode } from "react";

import { render, screen } from "@/test/test-utils";
import { wait } from "@/utils/promises";

import Form from "../Form";
import { useAppForm } from "../Form.utils";

type TestFormData = {
  test: string;
};

const SampleForm: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode;
  value?: string;
}> = ({ children, value }) => {
  const form = useAppForm({
    defaultValues: {
      test: value,
    } as TestFormData,
  });

  return (
    <form.AppForm>
      <Form>
        <form.AppField name="test">{children}</form.AppField>
      </Form>
    </form.AppForm>
  );
};

describe("InputField", () => {
  it("renders", () => {
    render(<SampleForm>{(field) => <field.InputField data-testid="test" name="test" />}</SampleForm>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<SampleForm>{(field) => <field.InputField data-testid="test" className="test" name="test" />}</SampleForm>);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<SampleForm>{(field) => <field.InputField data-testid="test" data-foo="bar" name="test" />}</SampleForm>);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with label", () => {
    render(<SampleForm>{(field) => <field.InputField data-testid="test" label="test" name="test" />}</SampleForm>);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("renders inputfield with correct values", async () => {
    render(
      <SampleForm value="test-value">
        {(field) => (
          <field.InputField data-testid="test" name="test-name" description="test-description">
            <field.InputText data-testid="input" />
          </field.InputField>
        )}
      </SampleForm>,
    );

    await wait(50);
    expect(screen.getByTestId("test")).toHaveAttribute("name", "test-name");
    expect(screen.getByTestId<HTMLInputElement>("input").value).toBe("test-value");
    expect(screen.queryByText("test-description")).toBeInTheDocument();
  });

  it("renders as fieldset", async () => {
    render(
      <SampleForm>
        {(field) => <field.InputField data-testid="test" asFieldSet label="Test label" name="test-name" />}
      </SampleForm>,
    );

    expect(screen.getByTestId("test").tagName).toBe("FIELDSET");
    expect(screen.getByText("Test label").tagName).toBe("LEGEND");
  });

  it("renders required label", async () => {
    render(
      <SampleForm>
        {(field) => <field.InputField data-testid="test" asFieldSet label="Test label" name="test-name" required />}
      </SampleForm>,
    );

    expect(screen.getByText("Test label").innerHTML).toContain("*");
  });

  it("does not render label if passLabelToChildren is true", async () => {
    render(<SampleForm>{(field) => <field.InputField passLabelToChildren />}</SampleForm>);

    expect(document.querySelector("label")).not.toBeInTheDocument();
  });
});
