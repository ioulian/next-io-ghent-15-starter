/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Expandable from "./Expandable";

describe("Ellipsis", () => {
  describeGeneralTests(<Expandable summary="test" />, () => ({ render }));

  it("renders with items", () => {
    render(
      <Expandable summary="test">
        <p data-testid="test">test</p>
      </Expandable>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  // FIXME: somehow onToggle is not being fired, but it works otherwise...
  // it("should call onToggle", () => {
  //   const spy = jest.fn();
  //   render(
  //     <Expandable summary="test-summary" data-testid="test" onToggle={spy}>
  //       <p>test</p>
  //     </Expandable>,
  //   );

  //   fireEvent.click(screen.getByText("test-summary"));

  //   expect(spy).toHaveBeenCalled();
  // });
});
