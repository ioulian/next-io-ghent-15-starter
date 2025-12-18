import { render, screen } from "@/test/test-utils";

import Select from "./Select";

describe("Select", () => {
  it("renders", () => {
    render(<Select data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Select data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Select data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with default empty option", () => {
    render(<Select data-testid="test" data-foo="bar" addEmptyOption />);
    expect((document.querySelector("select > option") as HTMLOptionElement)?.value).toBe("");
  });

  it("renders with custom empty option", () => {
    render(<Select data-testid="test" data-foo="bar" addEmptyOption="test" />);
    expect((document.querySelector("select > option") as HTMLOptionElement)?.innerHTML).toBe("test");
  });
});
