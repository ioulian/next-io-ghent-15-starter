import { easings } from "@/utils/easings";

import { createEasingGradient } from "./utilities";

describe("utilities", () => {
  it("generates a correct easing gradient", () => {
    const value = createEasingGradient("rgba(129,254,233,1)", "rgba(246,110,255,1)", easings.easeInOutQuad, 16);
    expect(value).toMatchSnapshot();
  });
});
