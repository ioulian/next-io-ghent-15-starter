import InputList from "@/components/organisms/form/input-list/InputList";
import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

describe("InputList", () => {
  describeGeneralTests(<InputList />, () => ({ render }));

  it("passes correct props to children", () => {
    render(
      <InputList name="test" id="test" disabled={false}>
        <div data-testid="test1">test1</div>
        <div data-testid="test2">test2</div>
      </InputList>,
    );
    expect(screen.getByTestId("test1")).toHaveAttribute("name", "test");
    expect(screen.getByTestId("test1")).toHaveAttribute("id", "test");
    expect(screen.getByTestId("test1")).not.toHaveAttribute("disabled");
    expect(screen.getByTestId("test2")).toHaveAttribute("name", "test");
    expect(screen.getByTestId("test2")).toHaveAttribute("id", "test");
    expect(screen.getByTestId("test2")).not.toHaveAttribute("disabled");
  });
});
