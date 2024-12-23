 

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Toggle from "./Toggle";

describe("SingleCheckbox", () => {
  it("renders", () => {
    render(<Toggle data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Toggle data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Toggle data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
