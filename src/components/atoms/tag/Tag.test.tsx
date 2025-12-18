import describeGeneralTests from "@/test/general-tests";
import { render } from "@/test/test-utils";

import Tag from "./Tag";

describe("Tag", () => {
  describeGeneralTests(<Tag>test</Tag>, () => ({ render }));
});
