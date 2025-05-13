import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import SingleCheckbox from "./SingleCheckbox";

describe("SingleCheckbox", () => {
  it("renders", () => {
    render(<SingleCheckbox data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<SingleCheckbox data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<SingleCheckbox data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders as indeterminate", () => {
    render(<SingleCheckbox data-testid="test" indeterminate />);
    expect(screen.getByTestId<HTMLInputElement>("test").indeterminate).toBe(true);
  });
});
