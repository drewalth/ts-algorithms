/**
 * Returns both the minimum and maximum elements in the sequence, using the
 * given predicate as the comparison between elements.
 *
 * @param source The source array to find min and max in
 * @param areInIncreasingOrder A predicate that returns true if its first argument should be ordered before its second argument
 * @returns A tuple containing the minimum and maximum elements, or null if the sequence is empty
 */
export function minMax<T>(
  source: T[],
  areInIncreasingOrder: (a: T, b: T) => boolean,
): { min: T; max: T } | null {
  // Check for empty array
  if (source.length === 0) {
    return null;
  }

  // Handle single element array
  if (source.length === 1) {
    return { min: source[0], max: source[0] };
  }

  // Initialize with first two elements
  let lowest = source[0];
  let highest = source[1];

  // Ensure initial bounds are correctly ordered
  if (areInIncreasingOrder(highest, lowest)) {
    [lowest, highest] = [highest, lowest];
  }

  // Process remaining elements in pairs
  for (let i = 2; i < source.length - 1; i += 2) {
    let low = source[i];
    let high = source[i + 1];

    // Order the pair
    if (areInIncreasingOrder(high, low)) {
      [low, high] = [high, low];
    }

    // Update lowest if necessary
    if (areInIncreasingOrder(low, lowest)) {
      lowest = low;
    }

    // Update highest if necessary
    if (!areInIncreasingOrder(high, highest)) {
      highest = high;
    }
  }

  // Handle last element if array length is odd
  if (source.length % 2 === 1) {
    const last = source[source.length - 1];
    if (areInIncreasingOrder(last, lowest)) {
      lowest = last;
    } else if (!areInIncreasingOrder(last, highest)) {
      highest = last;
    }
  }

  return { min: lowest, max: highest };
}

/**
 * Returns both the minimum and maximum elements in the sequence.
 *
 * @param source The source array to find min and max in
 * @returns A tuple containing the minimum and maximum elements, or null if the sequence is empty
 */
export function minMaxComparable<T extends Comparable>(
  source: T[],
): { min: T; max: T } | null {
  return minMax(source, (a, b) => a < b);
}

/**
 * A type that can be compared using the < operator.
 */
export interface Comparable {
  valueOf(): number | string | bigint | boolean | Date;
}
