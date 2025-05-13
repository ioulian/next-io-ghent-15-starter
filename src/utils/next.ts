import { Metadata, ResolvedMetadata, ResolvingMetadata } from "next";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isObject from "lodash/isObject";
import merge from "lodash/merge";
import omitBy from "lodash/omitBy";

/**
 * Helper function to resolve AND sanitize parent metadata
 */
export const generateSanitizedMetadata = <T extends Record<string, unknown>>(
  callback: (props: Omit<T, "children">, parentMetadata: ResolvedMetadata) => Promise<Metadata>,
) => {
  return async (props: Omit<T, "children">, parent: ResolvingMetadata): Promise<Metadata> => {
    // Resolve parent metadata
    const parentMetadata = await parent;

    // Resolve new ones
    const newValues = await callback(props, parentMetadata);

    // Merge new ones with the old ones
    return merge(
      omitBy(parentMetadata, (value): boolean => {
        return (
          isNil(value) ||
          // Empty objects
          isEmpty(value) ||
          // Objects with empty values (direct descendants)
          (!Array.isArray(value) && isObject(value) && Object.values(value).every(isNil))
        );
      }),
      newValues,
    );
  };
};
