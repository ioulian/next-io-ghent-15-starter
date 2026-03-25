import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

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

  it("renders with a directory separator in the name", () => {
    render(<SvgSprite data-testid="test" name="test/logo" />);
    expect(screen.getByTestId("test").querySelector("use")).toHaveAttribute(
      "xlink:href",
      expect.stringContaining("test--logo"),
    );
  });

  describe("cache busting", () => {
    const originalEnv = process.env;

    afterEach(() => {
      process.env = originalEnv;
    });

    it("uses 'v1' as cache buster when NEXT_PUBLIC_CUSTOM_BUILD_ID is not set", () => {
      delete process.env.NEXT_PUBLIC_CUSTOM_BUILD_ID;
      render(<SvgSprite data-testid="test" name="logo" />);
      expect(screen.getByTestId("test").querySelector("use")).toHaveAttribute(
        "xlink:href",
        expect.stringContaining("?v1#"),
      );
    });

    it("uses NEXT_PUBLIC_CUSTOM_BUILD_ID as cache buster when set", () => {
      process.env = { ...originalEnv, NEXT_PUBLIC_CUSTOM_BUILD_ID: "abc123" };
      render(<SvgSprite data-testid="test" name="logo" />);
      expect(screen.getByTestId("test").querySelector("use")).toHaveAttribute(
        "xlink:href",
        expect.stringContaining("?abc123#"),
      );
    });
  });
});
