import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Label from "./Label";

describe("Label", () => {
  it("renders", () => {
    render(<Label data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Label data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Label data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders required label", () => {
    render(<Label required />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden");
    expect(screen.getByText("*")).toHaveAttribute("title");
  });
});
