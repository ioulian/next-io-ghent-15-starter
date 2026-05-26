import { isString } from "@/types/type-guards";

/**
 * Will get correct `aria-describedby` attribute for a form field
 *
 * @param {...ids} Described by element ID's
 */
export const getAriaDescribedBy = (...ids: (string | false | undefined)[]): string | undefined => {
  return ids.filter(isString).join(" ");
};
