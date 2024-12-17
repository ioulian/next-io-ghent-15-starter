import { Metadata, ResolvedMetadata, ResolvingMetadata } from "next";
import merge from "lodash/merge";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";

/**
 * Will get build ID of current application build, is useful for cache busting
 */
export const getBuildId = (): string | "development" => {
  if (process.env.IS_STORYBOOK === "true") {
    return "development";
  }

  return process.env.NODE_ENV === "development"
    ? /* c8 ignore next */
      "development"
    : process.env.NEXT_PUBLIC_CUSTOM_BUILD_ID!;
};

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
