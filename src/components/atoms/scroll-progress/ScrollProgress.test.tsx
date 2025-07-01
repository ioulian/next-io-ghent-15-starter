import { render } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import ScrollProgress from "./ScrollProgress";

describe("ScrollProgress", () => {
  describeGeneralTests(<ScrollProgress />, () => ({ render }));
});
