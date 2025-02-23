/**
 * Returns an array of chunks from the source array, where each chunk contains elements
 * that belong together based on the given predicate function.
 * 
 * @param source The source array to chunk
 * @param belongInSameGroup A function that takes two adjacent elements and returns true if they belong in the same group
 * @returns An array of chunks where each chunk is an array of elements
 */
export function chunkedBy<T>(
  source: T[],
  belongInSameGroup: (a: T, b: T) => boolean
): T[][] {
  if (source.length === 0) return [];

  const result: T[][] = [];
  let currentChunk: T[] = [source[0]];

  for (let i = 1; i < source.length; i++) {
    const current = source[i];
    const previous = source[i - 1];

    if (belongInSameGroup(previous, current)) {
      currentChunk.push(current);
    } else {
      result.push(currentChunk);
      currentChunk = [current];
    }
  }

  if (currentChunk.length > 0) {
    result.push(currentChunk);
  }

  return result;
}

/**
 * Returns an array of tuples, where each tuple contains a key and a chunk of elements
 * that share that key based on the projection function.
 * 
 * @param source The source array to chunk
 * @param projection A function that takes an element and returns a key to group by
 * @returns An array of tuples containing the key and chunk of elements
 */
export function chunkedOn<T, K>(
  source: T[],
  projection: (element: T) => K
): [K, T[]][] {
  if (source.length === 0) return [];

  const result: [K, T[]][] = [];
  let currentKey = projection(source[0]);
  let currentChunk: T[] = [source[0]];

  for (let i = 1; i < source.length; i++) {
    const element = source[i];
    const newKey = projection(element);

    if (Object.is(currentKey, newKey)) {
      currentChunk.push(element);
    } else {
      result.push([currentKey, currentChunk]);
      currentKey = newKey;
      currentChunk = [element];
    }
  }

  if (currentChunk.length > 0) {
    result.push([currentKey, currentChunk]);
  }

  return result;
}

/**
 * Returns an array of chunks from the source array, where each chunk has the specified count
 * of elements (except possibly the last chunk which may be smaller).
 * 
 * @param source The source array to chunk
 * @param count The size of each chunk
 * @returns An array of chunks where each chunk is an array of elements
 */
export function chunked<T>(source: T[], count: number): T[][] {
  if (count <= 0) {
    throw new Error("Cannot chunk with count <= 0!");
  }

  const result: T[][] = [];
  for (let i = 0; i < source.length; i += count) {
    result.push(source.slice(i, i + count));
  }
  return result;
}

/**
 * Returns an array of chunks from the source array, where the array is divided into
 * the specified number of chunks as evenly as possible.
 * 
 * @param source The source array to chunk
 * @param numberOfChunks The number of chunks to create
 * @returns An array of chunks where each chunk is an array of elements
 */
export function evenlyChunked<T>(source: T[], numberOfChunks: number): T[][] {
  if (numberOfChunks < 0) {
    throw new Error("Can't divide into a negative number of chunks");
  }
  if (numberOfChunks === 0 && source.length > 0) {
    throw new Error("Can't divide a non-empty array into 0 chunks");
  }
  if (source.length === 0) {
    return Array(numberOfChunks).fill([]);
  }

  const result: T[][] = [];
  const baseChunkSize = Math.floor(source.length / numberOfChunks);
  const remainder = source.length % numberOfChunks;

  let currentIndex = 0;
  for (let i = 0; i < numberOfChunks; i++) {
    const chunkSize = baseChunkSize + (i < remainder ? 1 : 0);
    result.push(source.slice(currentIndex, currentIndex + chunkSize));
    currentIndex += chunkSize;
  }

  return result;
}
