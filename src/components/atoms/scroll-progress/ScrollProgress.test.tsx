import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import ScrollProgress from "./ScrollProgress";

describe("ScrollProgress", () => {
  describeGeneralTests(<ScrollProgress />, () => ({ render }));
});
