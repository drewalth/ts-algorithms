/**
 * Returns a sequence with only the unique elements of the source array,
 * using the provided projection function to determine uniqueness.
 * 
 * @param source The source array to find unique elements in
 * @param projection A function that transforms an element into the value to use for uniqueness
 * @returns An array with only the unique elements
 */
export function uniquedOn<T, K>(
  source: T[],
  projection: (element: T) => K
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const element of source) {
    const key = projection(element);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(element);
    }
  }

  return result;
}

/**
 * Returns a sequence with only the unique elements of the source array.
 * 
 * @param source The source array of hashable elements
 * @returns An array with only the unique elements
 */
export function uniqued<T extends Hashable>(source: T[]): T[] {
  return uniquedOn(source, element => element.valueOf());
}

/**
 * A lazy sequence wrapper that leaves out duplicate elements of a base sequence.
 */
export class UniquedSequence<T, K> implements Iterable<T> {
  private base: Iterable<T>;
  private projection: (element: T) => K;

  constructor(base: Iterable<T>, projection: (element: T) => K) {
    this.base = base;
    this.projection = projection;
  }

  *[Symbol.iterator](): Iterator<T> {
    const seen = new Set<K>();
    
    for (const element of this.base) {
      const key = this.projection(element);
      if (!seen.has(key)) {
        seen.add(key);
        yield element;
      }
    }
  }
}

/**
 * Returns a lazy sequence with only the unique elements of the source sequence.
 * 
 * @param source The source sequence
 * @param projection A function that transforms an element into the value to use for uniqueness
 * @returns A lazy sequence with only the unique elements
 */
export function lazyUniquedOn<T, K>(
  source: Iterable<T>,
  projection: (element: T) => K
): UniquedSequence<T, K> {
  return new UniquedSequence(source, projection);
}

/**
 * Returns a lazy sequence with only the unique elements of the source sequence.
 * 
 * @param source The source sequence of hashable elements
 * @returns A lazy sequence with only the unique elements
 */
export function lazyUniqued<T extends Hashable>(source: Iterable<T>): UniquedSequence<T, any> {
  return new UniquedSequence(source, element => element.valueOf());
}

/**
 * A type that can be used as a key in a Set.
 */
export interface Hashable {
  valueOf(): number | string | bigint | boolean | Date;
}
