#!/usr/bin/env node
import path from "path";

import { loadEnvConfig } from "@next/env";

import defaultManifest from "./../src/app/manifest";
import { getErrorMessage } from "./utils";

loadEnvConfig(path.join(__dirname, "./.."), false);

// Set to "false" to test builds locally, remember to turn it back on!
const SHOULD_FAIL_ON_ERROR = true;

// Keep track of errors
let envFileError = false;
let manifestFileError = false;

// Check if user has forgot to change SITE_URL
if (
  typeof process.env.SITE_URL === "undefined" ||
  process.env.SITE_URL.startsWith("http://localhost") ||
  process.env.SITE_URL.startsWith("https://localhost")
) {
  envFileError = true;
  console.error(
    getErrorMessage("SITE_URL is still set to LOCALHOST, please set this to the correct URL!"),
  );
}

// Check if manifest file contains default values
const manifestValues = defaultManifest();
if (
  (typeof manifestValues.name === "string" && manifestValues.name === "iO Ghent") ||
  (typeof manifestValues.short_name === "string" && manifestValues.short_name === "iO Ghent") ||
  (typeof manifestValues.description === "string" &&
    manifestValues.description === "iO Ghent Next.js starter kit")
) {
  manifestFileError = true;
  console.error(
    getErrorMessage("./src/app/manifest.ts contains default values, do not forget to update them!"),
  );
}

if ((envFileError === true || manifestFileError) && SHOULD_FAIL_ON_ERROR) {
  process.exit(1);
}

export {};
