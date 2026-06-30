import type { TranslationKeys } from "@zxcvbn-ts/core";

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
  const { ZxcvbnFactory } = await import(/* webpackChunkName: "zxcvbn" */ "@zxcvbn-ts/core");
  const options = await loadOptions();

  const zxcvbn = new ZxcvbnFactory({
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

  return zxcvbn.check(value);
};
