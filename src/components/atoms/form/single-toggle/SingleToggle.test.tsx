import { render, screen } from "@/test/test-utils";

import SingleToggle from "./SingleToggle";

describe("SingleToggle", () => {
  it("renders", () => {
    render(<SingleToggle data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<SingleToggle data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<SingleToggle data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
