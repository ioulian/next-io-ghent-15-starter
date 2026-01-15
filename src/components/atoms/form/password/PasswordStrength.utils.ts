import { TranslationKeys, zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";

const loadOptions = async () => {
  const zxcvbnCommonPackage = await import(/* webpackChunkName: "zxcvbnCommonPackage" */ "@zxcvbn-ts/language-common");

  return {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
  };
};

export const validatePassword = async (
  value: string,
  timeEstimationTranslations: TranslationKeys["timeEstimation"],
) => {
  const options = await loadOptions();
  zxcvbnOptions.setOptions({
    ...options,
    translations: {
      warnings: {
        straightRow: "",
        keyPattern: "",
        simpleRepeat: "",
        extendedRepeat: "",
        sequences: "",
        recentYears: "",
        dates: "",
        topTen: "",
        topHundred: "",
        common: "",
        similarToCommon: "",
        wordByItself: "",
        namesByThemselves: "",
        commonNames: "",
        userInputs: "",
        pwned: "",
      },
      suggestions: {
        l33t: "",
        reverseWords: "",
        allUppercase: "",
        capitalization: "",
        dates: "",
        recentYears: "",
        associatedYears: "",
        sequences: "",
        repeated: "",
        longerKeyboardPattern: "",
        anotherWord: "",
        useWords: "",
        noNeed: "",
        pwned: "",
      },
      timeEstimation: timeEstimationTranslations,
    },
  });

  return zxcvbn(value);
};
