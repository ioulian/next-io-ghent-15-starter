import { getCss, getVariable, getVariableAsNumber } from "./variables";

describe("variables", () => {
  it("generates correct css", () => {
    const value = getCss();
    expect(value).toMatchSnapshot();
  });

  it("getVariable runs correctly", () => {
    const value = getVariable("duration.fast");
    expect(value).toBe("100ms");
  });

  it("getVariableAsNumber runs correctly", () => {
    const value = getVariableAsNumber("duration.fast");
    expect(value).toBe(100);
  });
});
