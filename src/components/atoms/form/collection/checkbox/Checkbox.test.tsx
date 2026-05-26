import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  describeGeneralTests(<Checkbox />, () => ({ render }));

  it("renders with correct id", () => {
    render(<Checkbox value="value" id="id" data-testid="test" />);
    expect(screen.getByTestId("test")).toHaveAttribute("id", "id-value");
  });
});
