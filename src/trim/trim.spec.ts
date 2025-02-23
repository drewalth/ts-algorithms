import {
  trim,
  trimming,
  trimPrefix,
  trimSuffix,
  trimmingPrefix,
  trimmingSuffix,
} from "./trim";

describe("trim functions", () => {
  describe("immutable operations", () => {
    describe("trimmingPrefix", () => {
      it("should remove elements from start that match predicate", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        const result = trimmingPrefix(numbers, (n) => n < 3);
        expect(result).toEqual([3, 4, 5, 1, 2]);
      });

      it("should handle empty arrays", () => {
        const result = trimmingPrefix([], (n) => n < 3);
        expect(result).toEqual([]);
      });

      it("should handle array where all elements match predicate", () => {
        const result = trimmingPrefix([1, 2, 1, 2], (n) => n < 3);
        expect(result).toEqual([]);
      });
    });

    describe("trimmingSuffix", () => {
      it("should remove elements from end that match predicate", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        const result = trimmingSuffix(numbers, (n) => n < 3);
        expect(result).toEqual([1, 2, 3, 4, 5]);
      });

      it("should handle empty arrays", () => {
        const result = trimmingSuffix([], (n) => n < 3);
        expect(result).toEqual([]);
      });

      it("should handle array where all elements match predicate", () => {
        const result = trimmingSuffix([1, 2, 1, 2], (n) => n < 3);
        expect(result).toEqual([]);
      });
    });

    describe("trimming", () => {
      it("should remove elements from both ends that match predicate", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        const result = trimming(numbers, (n) => n < 3);
        expect(result).toEqual([3, 4, 5]);
      });

      it("should handle empty arrays", () => {
        const result = trimming([], (n) => n < 3);
        expect(result).toEqual([]);
      });

      it("should handle array where all elements match predicate", () => {
        const result = trimming([1, 2, 1, 2], (n) => n < 3);
        expect(result).toEqual([]);
      });
    });
  });

  describe("mutable operations", () => {
    describe("trimPrefix", () => {
      it("should mutate array by removing elements from start", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        trimPrefix(numbers, (n) => n < 3);
        expect(numbers).toEqual([3, 4, 5, 1, 2]);
      });

      it("should handle empty arrays", () => {
        const numbers: number[] = [];
        trimPrefix(numbers, (n) => n < 3);
        expect(numbers).toEqual([]);
      });
    });

    describe("trimSuffix", () => {
      it("should mutate array by removing elements from end", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        trimSuffix(numbers, (n) => n < 3);
        expect(numbers).toEqual([1, 2, 3, 4, 5]);
      });

      it("should handle empty arrays", () => {
        const numbers: number[] = [];
        trimSuffix(numbers, (n) => n < 3);
        expect(numbers).toEqual([]);
      });
    });

    describe("trim", () => {
      it("should mutate array by removing elements from both ends", () => {
        const numbers = [1, 2, 3, 4, 5, 1, 2];
        trim(numbers, (n) => n < 3);
        expect(numbers).toEqual([3, 4, 5]);
      });

      it("should handle empty arrays", () => {
        const numbers: number[] = [];
        trim(numbers, (n) => n < 3);
        expect(numbers).toEqual([]);
      });

      it("should handle strings with whitespace", () => {
        const text = "  hello world  ".split("");
        trim(text, (char) => char === " ");
        expect(text.join("")).toBe("hello world");
      });
    });
  });
});
