import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Input from "./Input";

describe("Input", () => {
  it("renders", () => {
    render(<Input data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Input data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Input data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with iconBefore and iconAfter", () => {
    render(
      <Input
        iconBefore={<span data-testid="iconBefore" />}
        iconAfter={<span data-testid="iconAfter" />}
      />,
    );
    expect(screen.getByTestId("iconBefore")).toBeInTheDocument();
    expect(screen.getByTestId("iconAfter")).toBeInTheDocument();
  });
});
