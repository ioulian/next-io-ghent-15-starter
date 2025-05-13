/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Spinner from "./Spinner";

describe("Spinner", () => {
  describeGeneralTests(<Spinner>test</Spinner>, () => ({ render }));

  it("renders with label", () => {
    render(
      <Spinner>
        <span data-testid="test-label">Test</span>
      </Spinner>,
    );
    expect(screen.getByTestId("test-label")).toBeInTheDocument();
  });

  it("renders with aria-label", () => {
    render(<Spinner data-testid="test">Test</Spinner>);
    expect(screen.getByTestId("test").getAttribute("aria-label")).toBe("Test");
  });
});
