import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import SvgSprite from "./SvgSprite";

describe("SvgSprite", () => {
  describeGeneralTests(<SvgSprite name="logo" />, () => ({ render }));

  it("renders as a decorative image", () => {
    render(<SvgSprite data-testid="test" name="logo" />);
    expect(screen.getByTestId("test")).not.toHaveRole("img");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders as a content image", () => {
    render(<SvgSprite data-testid="test" title="test title" name="logo" />);
    expect(screen.getByTestId("test")).toHaveRole("img");
    expect(screen.getByTestId("test")).not.toHaveAttribute("aria-hidden", "true");
    const title = screen.getByText("test title");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-labelledby", title.id);
  });
});
