import { render, screen } from "@/test/test-utils";

import Description from "./Description";

describe("Description", () => {
  it("renders", () => {
    render(<Description id="test" data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Description id="test" data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Description id="test" data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
