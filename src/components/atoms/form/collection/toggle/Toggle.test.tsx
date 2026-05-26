import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Toggle from "./Toggle";

describe("Toggle", () => {
  describeGeneralTests(<Toggle />, () => ({ render }));

  it("renders with correct id", () => {
    render(<Toggle value="value" id="id" data-testid="test" />);
    expect(screen.getByTestId("test")).toHaveAttribute("id", "id-value");
  });
});
