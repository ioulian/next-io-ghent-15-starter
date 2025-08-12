import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  describeGeneralTests(<Breadcrumb />, () => ({ render }));

  it("renders with items", () => {
    render(
      <Breadcrumb data-testid="test">
        <button data-testid="button1" type="button">
          Button 1
        </button>
        asdf
        <button data-testid="button2" type="button">
          Button 2
        </button>
      </Breadcrumb>,
    );
    expect(screen.getByTestId("button1")).toBeInTheDocument();
    expect(screen.getByTestId("button2")).toBeInTheDocument();
    expect(screen.getByTestId("button2")).toHaveAttribute("aria-current", "page");
  });
});
