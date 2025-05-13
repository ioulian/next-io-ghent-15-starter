/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Ellipsis from "./Ellipsis";

describe("Ellipsis", () => {
  describeGeneralTests(<Ellipsis />, () => ({ render }));

  it("renders with items", () => {
    render(
      <Ellipsis>
        <p data-testid="test">test</p>
      </Ellipsis>,
    );
    expect(screen.queryAllByTestId("test")[0]).toBeInTheDocument();
  });

  it("should call onToggle", () => {
    const spy = jest.fn();
    render(
      <Ellipsis data-testid="test" onToggle={spy}>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Ellipsis>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalled();
  });
});
