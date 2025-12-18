import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import CloseButton from "./CloseButton";

describe("CircularProgress", () => {
  describeGeneralTests(<CloseButton>close</CloseButton>, () => ({ render }));
});
