export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isEmpty = (value: unknown): boolean => {
  if (isNil(value)) {
    return true;
  }
  if (typeof value === "string") {
    return value.length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value as object).length === 0;
  }

  return false;
};

export const isObject = (value: unknown): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const omitBy = <T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: unknown, key: string) => boolean,
): Partial<T> => {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!predicate(value, key)) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
};
