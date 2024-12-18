import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SvgSprite from "./SvgSprite";

describe("SvgSprite", () => {
  it("renders", () => {
    render(<SvgSprite data-testid="test" src={{ id: "test", viewBox: "" }} />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<SvgSprite data-testid="test" src={{ id: "test", viewBox: "" }} className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<SvgSprite data-testid="test" src={{ id: "test", viewBox: "" }} data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders as a decorative image", () => {
    render(<SvgSprite data-testid="test" src={{ id: "test", viewBox: "" }} />);
    expect(screen.getByTestId("test")).not.toHaveRole("img");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders as a content image", () => {
    render(<SvgSprite data-testid="test" title="test title" src={{ id: "test", viewBox: "" }} />);
    expect(screen.getByTestId("test")).toHaveRole("img");
    expect(screen.getByTestId("test")).not.toHaveAttribute("aria-hidden", "true");
    const title = screen.getByText("test title");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-labelledby", title.id);
  });
});
