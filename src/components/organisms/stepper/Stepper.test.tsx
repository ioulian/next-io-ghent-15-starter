import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Step from "./Step";
import Stepper from "./Stepper";

describe("Stepper", () => {
  describeGeneralTests(<Stepper />, () => ({ render }));

  it("renders with items", () => {
    render(
      <Stepper>
        <Step data-testid="test" index={0}>
          content 1
        </Step>
      </Stepper>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
