import type { FC, ReactNode } from "react";

import { userEvent } from "storybook/test";

import { act, fireEvent, render, screen } from "@/test/test-utils";
import { wait } from "@/utils/promises";

import Form from "../Form";
import { useAppForm } from "../Form.utils";

type StringFormData = {
  test: string;
};

type ArrayFormData = {
  test: string[];
};

type BooleanFormData = {
  test: boolean;
};

const StringFieldForm: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode;
  value?: string;
}> = ({ children, value = "" }) => {
  const form = useAppForm({
    defaultValues: {
      test: value,
    } as StringFormData,
  });

  return (
    <form.AppForm>
      <Form>
        <form.AppField name="test">{children}</form.AppField>
      </Form>
    </form.AppForm>
  );
};

const ArrayFieldForm: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode;
  value?: string[];
}> = ({
  children,
  // Doesn't matter as this is a test only
  // eslint-disable-next-line react/no-object-type-as-default-prop
  value = [],
}) => {
  const form = useAppForm({
    defaultValues: {
      test: value,
    } as ArrayFormData,
  });

  return (
    <form.AppForm>
      <Form>
        <form.AppField name="test">{children}</form.AppField>
      </Form>
    </form.AppForm>
  );
};

const BooleanFieldForm: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode;
  value?: boolean;
}> = ({ children, value = false }) => {
  const form = useAppForm({
    defaultValues: {
      test: value,
    } as BooleanFormData,
  });

  return (
    <form.AppForm>
      <Form>
        <form.AppField name="test">{children}</form.AppField>
      </Form>
    </form.AppForm>
  );
};

describe("InputText", () => {
  it("renders with correct value", async () => {
    render(
      <StringFieldForm value="initial-value">{(field) => <field.InputText data-testid="test" />}</StringFieldForm>,
    );
    await wait(50);
    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("initial-value");
  });

  it("updates value on change", async () => {
    render(<StringFieldForm value="">{(field) => <field.InputText data-testid="test" />}</StringFieldForm>);
    await wait(50);

    await act(async () => {
      await userEvent.type(screen.getByTestId("test"), "new-value");
    });

    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("new-value");
  });
});

describe("InputPassword", () => {
  it("renders with correct value", async () => {
    render(
      <StringFieldForm value="secret-password">
        {(field) => <field.InputPassword data-testid="test" />}
      </StringFieldForm>,
    );
    await wait(50);
    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("secret-password");
  });

  it("updates value on change", async () => {
    render(<StringFieldForm value="">{(field) => <field.InputPassword data-testid="test" />}</StringFieldForm>);
    await wait(50);

    await act(async () => {
      await userEvent.type(screen.getByTestId("test"), "new-password");
    });

    expect(screen.getByTestId<HTMLInputElement>("test").value).toBe("new-password");
  });
});

describe("InputTextArea", () => {
  it("renders with correct value", async () => {
    render(
      <StringFieldForm value="initial-text">{(field) => <field.InputTextArea data-testid="test" />}</StringFieldForm>,
    );
    await wait(50);
    expect(screen.getByTestId<HTMLTextAreaElement>("test").value).toBe("initial-text");
  });

  it("updates value on change", async () => {
    render(<StringFieldForm value="">{(field) => <field.InputTextArea data-testid="test" />}</StringFieldForm>);
    await wait(50);

    await act(async () => {
      await userEvent.type(screen.getByTestId("test"), "new-text");
    });

    expect(screen.getByTestId<HTMLTextAreaElement>("test").value).toBe("new-text");
  });
});

describe("InputRadio", () => {
  it("renders with correct value", async () => {
    render(
      <StringFieldForm value="option1">
        {(field) => (
          <>
            <field.InputRadio data-testid="radio1" value="option1" label="Option 1" id="radio" />
            <field.InputRadio data-testid="radio2" value="option2" label="Option 2" id="radio" />
          </>
        )}
      </StringFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("radio1")).toBeChecked();
    expect(screen.getByTestId("radio2")).not.toBeChecked();
  });

  it("updates value on change", async () => {
    render(
      <StringFieldForm value="option1">
        {(field) => (
          <>
            <field.InputRadio data-testid="radio1" value="option1" label="Option 1" id="radio" />
            <field.InputRadio data-testid="radio2" value="option2" label="Option 2" id="radio" />
          </>
        )}
      </StringFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("radio2"));
    });

    expect(screen.getByTestId("radio1")).not.toBeChecked();
    expect(screen.getByTestId("radio2")).toBeChecked();
  });
});

describe("InputCheckbox", () => {
  it("renders with correct value", async () => {
    render(
      <ArrayFieldForm value={["option1", "option2"]}>
        {(field) => (
          <>
            <field.InputCheckbox data-testid="cb1" value="option1" label="Option 1" id="checkbox" />
            <field.InputCheckbox data-testid="cb2" value="option2" label="Option 2" id="checkbox" />
            <field.InputCheckbox data-testid="cb3" value="option3" label="Option 3" id="checkbox" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("cb1")).toBeChecked();
    expect(screen.getByTestId("cb2")).toBeChecked();
    expect(screen.getByTestId("cb3")).not.toBeChecked();
  });

  it("updates value on change - adds to array", async () => {
    render(
      <ArrayFieldForm value={["option1"]}>
        {(field) => (
          <>
            <field.InputCheckbox data-testid="cb1" value="option1" label="Option 1" id="checkbox" />
            <field.InputCheckbox data-testid="cb2" value="option2" label="Option 2" id="checkbox" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("cb2"));
    });

    expect(screen.getByTestId("cb1")).toBeChecked();
    expect(screen.getByTestId("cb2")).toBeChecked();
  });

  it("updates value on change - removes from array", async () => {
    render(
      <ArrayFieldForm value={["option1", "option2"]}>
        {(field) => (
          <>
            <field.InputCheckbox data-testid="cb1" value="option1" label="Option 1" id="checkbox" />
            <field.InputCheckbox data-testid="cb2" value="option2" label="Option 2" id="checkbox" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("cb1"));
    });

    expect(screen.getByTestId("cb1")).not.toBeChecked();
    expect(screen.getByTestId("cb2")).toBeChecked();
  });
});

describe("InputToggle", () => {
  it("renders with correct value", async () => {
    render(
      <ArrayFieldForm value={["option1", "option2"]}>
        {(field) => (
          <>
            <field.InputToggle data-testid="toggle1" value="option1" label="Option 1" id="toggle" />
            <field.InputToggle data-testid="toggle2" value="option2" label="Option 2" id="toggle" />
            <field.InputToggle data-testid="toggle3" value="option3" label="Option 3" id="toggle" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("toggle1")).toBeChecked();
    expect(screen.getByTestId("toggle2")).toBeChecked();
    expect(screen.getByTestId("toggle3")).not.toBeChecked();
  });

  it("updates value on change - adds to array", async () => {
    render(
      <ArrayFieldForm value={["option1"]}>
        {(field) => (
          <>
            <field.InputToggle data-testid="toggle1" value="option1" label="Option 1" id="toggle" />
            <field.InputToggle data-testid="toggle2" value="option2" label="Option 2" id="toggle" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("toggle2"));
    });

    expect(screen.getByTestId("toggle1")).toBeChecked();
    expect(screen.getByTestId("toggle2")).toBeChecked();
  });

  it("updates value on change - removes from array", async () => {
    render(
      <ArrayFieldForm value={["option1", "option2"]}>
        {(field) => (
          <>
            <field.InputToggle data-testid="toggle1" value="option1" label="Option 1" id="toggle" />
            <field.InputToggle data-testid="toggle2" value="option2" label="Option 2" id="toggle" />
          </>
        )}
      </ArrayFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("toggle1"));
    });

    expect(screen.getByTestId("toggle1")).not.toBeChecked();
    expect(screen.getByTestId("toggle2")).toBeChecked();
  });
});

describe("InputBooleanCheckbox", () => {
  it("renders with correct value - checked", async () => {
    render(
      <BooleanFieldForm value>
        {(field) => <field.InputBooleanCheckbox data-testid="test" label="Accept terms" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("test")).toBeChecked();
  });

  it("renders with correct value - unchecked", async () => {
    render(
      <BooleanFieldForm value={false}>
        {(field) => <field.InputBooleanCheckbox data-testid="test" label="Accept terms" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("test")).not.toBeChecked();
  });

  it("updates value on change - checks", async () => {
    render(
      <BooleanFieldForm value={false}>
        {(field) => <field.InputBooleanCheckbox data-testid="test" label="Accept terms" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("test"));
    });

    expect(screen.getByTestId("test")).toBeChecked();
  });

  it("updates value on change - unchecks", async () => {
    render(
      <BooleanFieldForm value>
        {(field) => <field.InputBooleanCheckbox data-testid="test" label="Accept terms" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("test"));
    });

    expect(screen.getByTestId("test")).not.toBeChecked();
  });
});

describe("InputBooleanToggle", () => {
  it("renders with correct value - checked", async () => {
    render(
      <BooleanFieldForm value>
        {(field) => <field.InputBooleanToggle data-testid="test" label="Enable feature" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("test")).toBeChecked();
  });

  it("renders with correct value - unchecked", async () => {
    render(
      <BooleanFieldForm value={false}>
        {(field) => <field.InputBooleanToggle data-testid="test" label="Enable feature" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    expect(screen.getByTestId("test")).not.toBeChecked();
  });

  it("updates value on change - checks", async () => {
    render(
      <BooleanFieldForm value={false}>
        {(field) => <field.InputBooleanToggle data-testid="test" label="Enable feature" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("test"));
    });

    expect(screen.getByTestId("test")).toBeChecked();
  });

  it("updates value on change - unchecks", async () => {
    render(
      <BooleanFieldForm value>
        {(field) => <field.InputBooleanToggle data-testid="test" label="Enable feature" />}
      </BooleanFieldForm>,
    );
    await wait(50);

    await act(async () => {
      fireEvent.click(screen.getByTestId("test"));
    });

    expect(screen.getByTestId("test")).not.toBeChecked();
  });
});
