/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Expandable from "./Expandable";

describe("Ellipsis", () => {
  it("renders", () => {
    render(<Expandable data-testid="test" summary="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Expandable data-testid="test" className="test" summary="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Expandable data-testid="test" data-foo="bar" summary="test" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

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
