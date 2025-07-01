import { render, screen } from "@testing-library/react";

import VisuallyHidden from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("renders", () => {
    render(<VisuallyHidden data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<VisuallyHidden data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<VisuallyHidden data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
