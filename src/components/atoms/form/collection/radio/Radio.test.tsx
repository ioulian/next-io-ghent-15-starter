import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Radio from "./Radio";

describe("Radio", () => {
  describeGeneralTests(<Radio />, () => ({ render }));

  it("renders with correct id", () => {
    render(<Radio value="value" id="id" data-testid="test" />);
    expect(screen.getByTestId("test")).toHaveAttribute("id", "id-value");
  });
});
