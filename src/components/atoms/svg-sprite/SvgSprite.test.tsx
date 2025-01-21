import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import SvgSprite from "./SvgSprite";

describe("SvgSprite", () => {
  describeGeneralTests(<SvgSprite src={{ id: "test", viewBox: "" }} />, () => ({ render }));

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
