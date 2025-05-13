/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Tag from "./Tag";

describe("Tag", () => {
  describeGeneralTests(<Tag>test</Tag>, () => ({ render }));
});
