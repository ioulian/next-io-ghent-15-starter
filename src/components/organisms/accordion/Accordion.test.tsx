import Expandable from "@/components/molecules/expandable/Expandable";
import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Accordion from "./Accordion";

describe("Ellipsis", () => {
  describeGeneralTests(
    <Accordion>
      <Expandable summary="summary 1">content 1</Expandable>
      <Expandable summary="summary 2">content 2</Expandable>
    </Accordion>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <Accordion>
        <Expandable data-testid="test" summary="summary 1">
          content 1
        </Expandable>
        <Expandable summary="summary 2">content 2</Expandable>
      </Accordion>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("provides given name to children", () => {
    const name = "test";
    render(
      <Accordion name={name}>
        <Expandable data-testid="expandable1" summary="summary 1">
          content 1
        </Expandable>
        <Expandable data-testid="expandable2" summary="summary 2">
          content 2
        </Expandable>
      </Accordion>,
    );
    expect(screen.getByTestId("expandable1").getAttribute("name")).toBe(name);
    expect(screen.getByTestId("expandable2").getAttribute("name")).toBe(name);
  });

  it("generates an unique name and provides it to children", () => {
    render(
      <Accordion>
        <Expandable data-testid="expandable1" summary="summary 1">
          content 1
        </Expandable>
        <Expandable data-testid="expandable2" summary="summary 2">
          content 2
        </Expandable>
      </Accordion>,
    );
    expect(screen.getByTestId("expandable1").getAttribute("name")).toBe(
      screen.getByTestId("expandable2").getAttribute("name"),
    );
  });
});
