import { userEvent } from "storybook/test";

import { act, render, screen } from "@/test/test-utils";

import OtpInput from "./OtpInput";

describe("OtpInput", () => {
  beforeAll(() => {
    document.elementFromPoint = () => null;
  });

  it("renders", () => {
    render(<OtpInput data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<OtpInput data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<OtpInput data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("updates value on change", async () => {
    const onChangeSpy = vi.fn();
    render(<OtpInput data-testid="test" value="" onChange={onChangeSpy} />);

    await act(async () => {
      await userEvent.type(screen.getByTestId("test"), "123456");
    });

    expect(onChangeSpy).toHaveBeenCalled();
  });
});
