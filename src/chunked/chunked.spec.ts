import { chunked, chunkedBy, chunkedOn, evenlyChunked } from "./chunked";

describe("chunked functions", () => {
  describe("chunkedBy", () => {
    it("should group elements by the predicate function", () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 2];
      const result = chunkedBy(numbers, (a, b) => a === b);
      expect(result).toEqual([[1], [2, 2], [3, 3, 3], [4, 4], [2]]);
    });

    it("should handle empty arrays", () => {
      const result = chunkedBy([], (a, b) => a === b);
      expect(result).toEqual([]);
    });

    it("should handle single element arrays", () => {
      const result = chunkedBy([1], (a, b) => a === b);
      expect(result).toEqual([[1]]);
    });
  });

  describe("chunkedOn", () => {
    it("should group elements by the projection function", () => {
      const numbers = [1, 11, 2, 21, 3, 31];
      const result = chunkedOn(numbers, (n) => Math.floor(n / 10));
      expect(result).toEqual([
        [0, [1]],
        [1, [11]],
        [0, [2]],
        [2, [21]],
        [0, [3]],
        [3, [31]],
      ]);
    });

    it("should handle empty arrays", () => {
      const result = chunkedOn([], (n) => n);
      expect(result).toEqual([]);
    });

    it("should handle single element arrays", () => {
      const result = chunkedOn([1], (n) => n);
      expect(result).toEqual([[1, [1]]]);
    });

    it("should correctly group consecutive elements with same key", () => {
      const words = ["apple", "ant", "banana", "car"];
      const result = chunkedOn(words, (word) => word[0]);
      expect(result).toEqual([
        ["a", ["apple", "ant"]],
        ["b", ["banana"]],
        ["c", ["car"]],
      ]);
    });
  });

  describe("chunked", () => {
    it("should create chunks of specified size", () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7];
      const result = chunked(numbers, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it("should handle empty arrays", () => {
      const result = chunked([], 2);
      expect(result).toEqual([]);
    });

    it("should throw error for invalid chunk size", () => {
      expect(() => chunked([1, 2, 3], 0)).toThrow(
        "Cannot chunk with count <= 0!",
      );
      expect(() => chunked([1, 2, 3], -1)).toThrow(
        "Cannot chunk with count <= 0!",
      );
    });

    it("should handle chunk size larger than array", () => {
      const result = chunked([1, 2, 3], 5);
      expect(result).toEqual([[1, 2, 3]]);
    });
  });

  describe("evenlyChunked", () => {
    it("should divide array into even chunks", () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = evenlyChunked(numbers, 3);
      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8],
      ]);
    });

    it("should handle empty arrays", () => {
      const result = evenlyChunked([], 3);
      expect(result).toEqual([[], [], []]);
    });

    it("should throw error for invalid number of chunks", () => {
      expect(() => evenlyChunked([1, 2, 3], -1)).toThrow(
        "Can't divide into a negative number of chunks",
      );
      expect(() => evenlyChunked([1, 2, 3], 0)).toThrow(
        "Can't divide a non-empty array into 0 chunks",
      );
    });

    it("should handle single chunk", () => {
      const result = evenlyChunked([1, 2, 3], 1);
      expect(result).toEqual([[1, 2, 3]]);
    });

    it("should distribute remainder elements evenly", () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = evenlyChunked(numbers, 3);
      // First two chunks get extra elements from remainder
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });
  });
});
