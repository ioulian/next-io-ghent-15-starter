import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders", () => {
    render(<TextArea data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<TextArea data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<TextArea data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
