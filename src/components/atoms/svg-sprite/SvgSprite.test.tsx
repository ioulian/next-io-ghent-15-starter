import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import SvgSprite from "./SvgSprite";

const sampleSvg = {
  checksum: "08c10cfb78fbba17901304a770635e24",
  symbolId: "cfb44f06568ad25a2882b86e81850db5",
  spritePath: "/_next/static/sprites/7c18a247b3ebf7fc361ed97e95119410.svg",
  attributes: { viewBox: "0 0 200 200" },
};

describe("SvgSprite", () => {
  describeGeneralTests(<SvgSprite src={sampleSvg} />, () => ({ render }));

  it("renders as a decorative image", () => {
    render(<SvgSprite data-testid="test" src={sampleSvg} />);
    expect(screen.getByTestId("test")).not.toHaveRole("img");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders as a content image", () => {
    render(<SvgSprite data-testid="test" title="test title" src={sampleSvg} />);
    expect(screen.getByTestId("test")).toHaveRole("img");
    expect(screen.getByTestId("test")).not.toHaveAttribute("aria-hidden", "true");
    const title = screen.getByText("test title");
    expect(screen.getByTestId("test")).toHaveAttribute("aria-labelledby", title.id);
  });
});
