/**
 * Returns an array of elements from the original array, taking every stride-th element.
 * This is a JavaScript implementation inspired by Swift Algorithms' stride functionality.
 *
 * @param array - The input array to be processed
 * @param stride - The number of elements to skip between selected elements
 * @returns A new array containing every stride-th element
 * @throws Will throw an error if the stride is less than or equal to 0
 *
 * @example
 * // Eager evaluation (returns array)
 * const result = stridingBy([1, 2, 3, 4, 5], 2);
 * // result is [1, 3, 5]
 */
export function stridingBy<T>(array: T[], stride: number): T[];
/**
 * Returns an iterator that yields every stride-th element from the original array.
 * This is a JavaScript implementation inspired by Swift Algorithms' stride functionality.
 *
 * @param array - The input array to be processed
 * @param stride - The number of elements to skip between selected elements
 * @param options - Configuration object
 * @param options.lazy - Must be true to get iterator behavior
 * @returns An iterator that yields every stride-th element
 * @throws Will throw an error if the stride is less than or equal to 0
 *
 * @example
 * // Lazy evaluation (returns iterator)
 * const iterator = stridingBy([1, 2, 3, 4, 5], 2, { lazy: true });
 * // iterator can be used with for...of or spread operator
 */
export function stridingBy<T>(
  array: T[],
  stride: number,
  options: { lazy: true },
): IterableIterator<T>;
/**
 * Implementation of stridingBy that handles both eager and lazy evaluation.
 * @see https://github.com/apple/swift-algorithms/blob/main/Guides/Stride.md
 */
export function stridingBy<T>(
  array: T[],
  stride: number,
  options: { lazy?: boolean } = {},
): T[] | IterableIterator<T> {
  if (stride <= 0) {
    throw new Error("Stride must be greater than 0");
  }

  // If lazy evaluation is requested, return an iterator
  if (options.lazy) {
    return (function* () {
      for (let i = 0; i < array.length; i += stride) {
        yield array[i];
      }
    })();
  }

  // Eager evaluation (default) - return array
  const resultSize = Math.ceil(array.length / stride);
  const result = new Array<T>(resultSize);

  for (let i = 0, j = 0; i < array.length; i += stride, j++) {
    result[j] = array[i];
  }
  return result;
}
