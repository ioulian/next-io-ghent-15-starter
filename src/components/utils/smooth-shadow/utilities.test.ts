import { createSmoothShadow } from "./utilities";
import { presetDefault } from "./presets";

describe("utilities", () => {
  it("generates a correct easing gradient", () => {
    const value = createSmoothShadow(presetDefault);
    expect(value).toMatchSnapshot();
  });
});
