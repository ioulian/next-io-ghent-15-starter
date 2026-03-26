import Input from "@/components/atoms/form/input/Input";
import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import FormField from "./FormField";

describe("FormField", () => {
  describeGeneralTests(<FormField />, () => ({ render }));

  it("renders with items", () => {
    render(
      <FormField data-testid="test">
        <Input data-testid="input" />
      </FormField>,
    );
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
});
