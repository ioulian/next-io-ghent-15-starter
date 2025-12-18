import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  describeGeneralTests(<CircularProgress percent={0} />, () => ({ render }));
});
