import { Metadata, ResolvedMetadata, ResolvingMetadata } from "next";

import { merge } from "ts-deepmerge";

import { isEmpty, isNil, isObject, omitBy } from "@/utils/data";

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
      omitBy(parentMetadata as unknown as Record<string, unknown>, (value): boolean => {
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
