import { render } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  describeGeneralTests(<CircularProgress percent={0} />, () => ({ render }));
});
