import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  describeGeneralTests(<CircularProgress percent={0} />, () => ({ render }));

  it("strokeLinecap is round when not at 100%", () => {
    const { container } = render(<CircularProgress percent={0.99} />);
    const svg = container.querySelector("svg");
    expect(svg?.querySelectorAll("circle")[1]?.getAttribute("stroke-linecap")).toBe("round");
  });

  it("strokeLinecap is undefined when at 100%", () => {
    const { container } = render(<CircularProgress percent={1} />);
    const svg = container.querySelector("svg");
    expect(svg?.querySelectorAll("circle")[1]?.getAttribute("stroke-linecap")).toBe(null);
  });
});
