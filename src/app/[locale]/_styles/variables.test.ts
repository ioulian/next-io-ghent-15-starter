import { getCss } from "./variables";

describe("variables", () => {
  it("generates correct css", () => {
    const value = getCss();
    expect(value).toMatchSnapshot();
  });
});
