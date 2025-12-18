import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import ButtonBar from "./ButtonBar";

describe("ButtonBar", () => {
  describeGeneralTests(<ButtonBar />, () => ({ render }));

  it("renders with items", () => {
    render(
      <ButtonBar data-testid="test">
        <button data-testid="button1" type="button">
          Button 1
        </button>
        asdf
        <button data-testid="button2" type="button">
          Button 2
        </button>
      </ButtonBar>,
    );
    expect(screen.getByTestId("button1")).toBeInTheDocument();
    expect(screen.getByTestId("button2")).toBeInTheDocument();
  });
});
