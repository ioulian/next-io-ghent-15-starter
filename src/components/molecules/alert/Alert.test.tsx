/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Alert from "./Alert";

describe("Alert", () => {
  describeGeneralTests(<Alert />, () => ({ render }));

  it("renders without icon", () => {
    render(<Alert icon={false}>test</Alert>);
    expect(screen.getByRole("alert").querySelector("svg")).toBe(null);
  });

  it("renders with customIcon", () => {
    render(<Alert icon={<span data-testid="test" />}>test</Alert>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
