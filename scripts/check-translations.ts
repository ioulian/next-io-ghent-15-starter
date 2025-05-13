#!/usr/bin/env node
import fs from "fs";
import path from "path";

import { locales } from "../src/i18n/constants";
import { getErrorMessage, getSimpleErrorMessage, getSimpleSuccessMessage } from "./utils";

// Colors: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color

// const PRIMARY_LOCALE = i18nextConfig.i18n.defaultLocale;
const POSSIBLE_LOCALES = locales;

const getKeysOfObjectRecursively = (
  object: Record<string, unknown>,
  parentKey: string = "",
): string[] => {
  return Object.entries(object).reduce<string[]>((list, [key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return [...list, ...getKeysOfObjectRecursively(value as Record<string, unknown>, currentKey)];
    } else {
      return [...list, currentKey];
    }
  }, []);
};

const getTranslationFiles = (locale: string): string[] =>
  fs.readdirSync(path.join(__dirname, `./../messages/${locale}`));

const getTranslationFile = (locale: string, name: string): Record<string, unknown> | undefined => {
  try {
    const file = fs.readFileSync(path.join(__dirname, `./../messages/${locale}/${name}`));

    if (!file) {
      return undefined;
    }

    return JSON.parse(file.toString()) as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

const check = async (): Promise<boolean> =>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  new Promise(async (resolve) => {
    let isCorrect = true;

    // Loop through each locale
    for (const primaryLocale of POSSIBLE_LOCALES) {
      // Get all files for current locale
      const primaryTranslationFiles = getTranslationFiles(primaryLocale);

      // Loop through all files inside this locale
      for (const primaryTranslationFileName of primaryTranslationFiles) {
        const primaryTranslationFile = getTranslationFile(
          primaryLocale,
          primaryTranslationFileName,
        );
        const primaryTranslationFileKeys = primaryTranslationFile
          ? getKeysOfObjectRecursively(primaryTranslationFile)
          : [];

        // Check the rest of the locales
        for (const locale of POSSIBLE_LOCALES.filter(
          (currentLocale) => currentLocale !== primaryLocale,
        )) {
          const localeTranslationFile = getTranslationFile(locale, primaryTranslationFileName);

          // Check if the file exists for the locale
          if (!localeTranslationFile) {
            console.error(
              getErrorMessage(
                `\x1b[1m${primaryTranslationFileName}\x1b[0m" is missing for "\x1b[1m${locale}\x1b[0m".`,
                "File",
              ),
            );
            isCorrect = false;
          } else {
            // Check if there are missing keys
            const translationFileKeys = getKeysOfObjectRecursively(localeTranslationFile);
            const missingKeys = primaryTranslationFileKeys.filter(
              (key) => !translationFileKeys.includes(key),
            );

            if (missingKeys.length !== 0) {
              missingKeys.forEach((missingKey) => {
                console.error(
                  getErrorMessage(
                    `"\x1b[1m${missingKey}\x1b[0m" from "\x1b[1m${primaryLocale}\x1b[0m" is missing from "\x1b[1m${primaryTranslationFileName}\x1b[0m" for "\x1b[1m${locale}\x1b[0m".`,
                    "Key",
                  ),
                );
              });
              isCorrect = false;
            }
          }
        }
      }
    }

    resolve(isCorrect);
  });

check().then((isCorrect) => {
  console.log("");

  if (!isCorrect) {
    console.error(getSimpleErrorMessage("Some errors have been found! You can see them above."));
    process.exit(1);
  }

  console.log(getSimpleSuccessMessage("Translations structure checks out!"));
  process.exit(0);
});
