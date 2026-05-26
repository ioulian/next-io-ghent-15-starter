import { fireEvent, userEvent } from "storybook/test";

import describeGeneralTests from "@/test/general-tests";
import { act, render, screen } from "@/test/test-utils";

import PasswordInput from "./PasswordInput";

describe("PasswordInput", () => {
  describeGeneralTests(<PasswordInput />, () => ({ render }));

  it("renders with correct id", async () => {
    render(<PasswordInput data-testid="test" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(screen.getByTestId("test")).toHaveAttribute("type", "text");
  });

  it("triggers on change", async () => {
    const onChangeSpy = vi.fn();
    render(<PasswordInput data-testid="test" value="" onChange={onChangeSpy} />);

    await act(async () => {
      await userEvent.type(screen.getByTestId("test"), "test");
    });

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("renders strength meter", async () => {
    render(
      <PasswordInput
        value=""
        onChange={() => {}}
        showStrengthMeter
        strengthMeterProps={{
          // @ts-expect-error It works
          "data-testid": "test",
        }}
      />,
    );

    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
