/**
 * Returns the first non-`null` and non-`undefined` result obtained from applying the given
 * transformation to the elements of the sequence.
 *
 * @example
 * ```typescript
 * const strings = ["three", "3.14", "-5", "2"];
 * const firstInt = firstNonNil(strings, s => {
 *   return /^-?\d+$/.test(s) ? parseInt(s, 10) : undefined;
 * });
 * console.log(firstInt); // -5
 * ```
 *
 * @param source The source array to search
 * @param transform A function that takes an element and returns either a value or undefined
 * @returns The first non-undefined return value of the transformation, or undefined if no transformation succeeds
 *
 * @complexity O(n), where n is the number of elements at the start of the sequence
 * that result in undefined when applying the transformation
 */
export function firstNonNil<T, R>(
  source: T[],
  transform: (element: T) => R | undefined,
): R | undefined {
  for (const value of source) {
    const result = transform(value);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

/**
 * Returns the first non-`null` and non-`undefined` result obtained from applying the given
 * transformation to the elements of the iterable sequence.
 *
 * @param source The source iterable to search
 * @param transform A function that takes an element and returns either a value or undefined
 * @returns The first non-undefined return value of the transformation, or undefined if no transformation succeeds
 */
export function firstNonNilFromIterable<T, R>(
  source: Iterable<T>,
  transform: (element: T) => R | undefined,
): R | undefined {
  for (const value of source) {
    const result = transform(value);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}
