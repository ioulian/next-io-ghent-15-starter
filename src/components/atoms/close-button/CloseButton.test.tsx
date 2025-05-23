/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import CloseButton from "./CloseButton";

describe("CircularProgress", () => {
  describeGeneralTests(<CloseButton>close</CloseButton>, () => ({ render }));
});
