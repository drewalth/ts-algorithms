import { firstNonNil, firstNonNilFromIterable } from "./firstnonnil";
import { describe, expect, it } from "vitest";

const parseIntStrict = (s: string) => {
  return /^-?\d+$/.test(s) ? parseInt(s, 10) : undefined;
};

describe("firstNonNil", () => {
  describe("array version", () => {
    it("should find first successful transformation", () => {
      const strings = ["three", "3.14", "-5", "2"];
      const result = firstNonNil(strings, parseIntStrict);
      expect(result).toBe(-5);
    });

    it("should handle empty arrays", () => {
      const result = firstNonNil([], parseIntStrict);
      expect(result).toBeUndefined();
    });

    it("should handle no successful transformations", () => {
      const strings = ["one", "two", "three"];
      const result = firstNonNil(strings, parseIntStrict);
      expect(result).toBeUndefined();
    });

    it("should handle first element transformation", () => {
      const numbers = ["1", "invalid", "2"];
      const result = firstNonNil(numbers, parseIntStrict);
      expect(result).toBe(1);
    });

    it("should handle complex transformations", () => {
      const objects = [
        { type: "text", value: "hello" },
        { type: "number", value: "123" },
        { type: "text", value: "world" },
      ];
      const result = firstNonNil(objects, (obj) =>
        obj.type === "number" ? parseInt(obj.value) : undefined,
      );
      expect(result).toBe(123);
    });

    it("should handle null values correctly", () => {
      const values = [null, undefined, 42, null];
      const result = firstNonNil(values, (x) => x ?? undefined);
      expect(result).toBe(42);
    });
  });

  describe("iterable version", () => {
    it("should work with iterables", () => {
      const numbers = ["three", "-5", "3.14", "2"];
      const result = firstNonNilFromIterable(numbers, parseIntStrict);
      expect(result).toBe(-5);
    });

    it("should handle empty iterables", () => {
      const set = new Set<string>();
      const result = firstNonNilFromIterable(set, parseIntStrict);
      expect(result).toBeUndefined();
    });

    it("should work with generators", () => {
      function* numberStrings() {
        yield "one";
        yield "2";
        yield "three";
      }

      const result = firstNonNilFromIterable(numberStrings(), parseIntStrict);
      expect(result).toBe(2);
    });

    it("should work with Sets", () => {
      const set = new Set(["three", "3.14", "-5", "2"]);
      const result = firstNonNilFromIterable(set, parseIntStrict);
      expect(typeof result).toBe("number");
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});
