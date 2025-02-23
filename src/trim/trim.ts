/**
 * Returns a subsequence by removing all elements from the start of the collection
 * that satisfy the given predicate.
 *
 * @param source The source array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 * @returns A new array with elements trimmed from the start
 */
export function trimmingPrefix<T>(
  source: T[],
  predicate: (element: T) => boolean,
): T[] {
  const startIndex = source.findIndex((element) => !predicate(element));
  return startIndex === -1 ? [] : source.slice(startIndex);
}

/**
 * Returns a subsequence by removing all elements from the end of the collection
 * that satisfy the given predicate.
 *
 * @param source The source array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 * @returns A new array with elements trimmed from the end
 */
export function trimmingSuffix<T>(
  source: T[],
  predicate: (element: T) => boolean,
): T[] {
  let endIndex = source.length;
  while (endIndex > 0 && predicate(source[endIndex - 1])) {
    endIndex--;
  }
  return source.slice(0, endIndex);
}

/**
 * Returns a subsequence by removing all elements from both ends of the collection
 * that satisfy the given predicate.
 *
 * @param source The source array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 * @returns A new array with elements trimmed from both ends
 */
export function trimming<T>(
  source: T[],
  predicate: (element: T) => boolean,
): T[] {
  return trimmingPrefix(trimmingSuffix(source, predicate), predicate);
}

/**
 * Mutates the array by removing all elements from the start that satisfy
 * the given predicate.
 *
 * @param array The array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 */
export function trimPrefix<T>(
  array: T[],
  predicate: (element: T) => boolean,
): void {
  const startIndex = array.findIndex((element) => !predicate(element));
  if (startIndex === -1) {
    array.length = 0;
  } else if (startIndex > 0) {
    array.splice(0, startIndex);
  }
}

/**
 * Mutates the array by removing all elements from the end that satisfy
 * the given predicate.
 *
 * @param array The array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 */
export function trimSuffix<T>(
  array: T[],
  predicate: (element: T) => boolean,
): void {
  let endIndex = array.length;
  while (endIndex > 0 && predicate(array[endIndex - 1])) {
    endIndex--;
  }
  array.length = endIndex;
}

/**
 * Mutates the array by removing all elements from both ends that satisfy
 * the given predicate.
 *
 * @param array The array to trim
 * @param predicate A function that returns true for elements that should be trimmed
 */
export function trim<T>(array: T[], predicate: (element: T) => boolean): void {
  trimSuffix(array, predicate);
  trimPrefix(array, predicate);
}
