import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import Parallax from "./Parallax";

describe("Parallax", () => {
  describeGeneralTests(<Parallax strength={0.2} />, () => ({ render }));
});
