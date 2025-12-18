import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup", () => {
  describeGeneralTests(<ButtonGroup />, () => ({ render }));

  it("renders with items", () => {
    render(
      <ButtonGroup data-testid="test">
        <button data-testid="button1" type="button">
          Button 1
        </button>
        asdf
        <button data-testid="button2" type="button">
          Button 2
        </button>
      </ButtonGroup>,
    );
    expect(screen.getByTestId("button1")).toBeInTheDocument();
    expect(screen.getByTestId("button2")).toBeInTheDocument();
  });
});
