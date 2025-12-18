import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import LinkButton from "./LinkButton";

describe("LinkButton", () => {
  describeGeneralTests(<LinkButton>test</LinkButton>, () => ({ render }));

  it("renders with iconBefore", () => {
    render(<LinkButton iconBefore={<span data-testid="iconBefore">before</span>}>test</LinkButton>);
    expect(screen.getByTestId("iconBefore")).toBeInTheDocument();
  });

  it("renders with iconAfter", () => {
    render(<LinkButton iconAfter={<span data-testid="iconAfter">after</span>}>test</LinkButton>);
    expect(screen.getByTestId("iconAfter")).toBeInTheDocument();
  });

  it("renders with iconOnly", () => {
    render(
      <LinkButton iconOnly>
        <span data-testid="test">test</span>
      </LinkButton>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
