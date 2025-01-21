/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import MainContentLink from "@/components/molecules/main-content/MainContentLink";
import describeGeneralTests from "@/test/generalTests";

import MainContent from "./MainContent";

describe("MainContent", () => {
  // @ts-expect-error ignore any
  let consoleWarnMock;
  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });
  afterEach(() => {
    // @ts-expect-error ignore any
    consoleWarnMock.mockRestore();
  });

  describeGeneralTests(<MainContent />, () => ({ render }));

  it("renders with items and does not warn", () => {
    render(
      <>
        <MainContentLink />
        <MainContent>
          <button data-testid="button1" type="button">
            Button 1
          </button>
        </MainContent>
      </>,
    );
    expect(screen.getByTestId("button1")).toBeInTheDocument();
    // @ts-expect-error ignore any
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it("warns user that <MainContentLink> has not been used", () => {
    render(<MainContent />);
    // @ts-expect-error ignore any
    expect(consoleWarnMock).toHaveBeenCalled();
  });
});
