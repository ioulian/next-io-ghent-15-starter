import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import Step from "./Step";

describe("Step", () => {
  describeGeneralTests(<Step index={0} />, () => ({ render }));
});
