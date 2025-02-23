import { minMax, minMaxComparable } from "./minmax";

describe("minMax", () => {
  describe("with custom comparator", () => {
    it("should find min and max in unsorted array", () => {
      const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
      const result = minMax(numbers, (a, b) => a < b);
      expect(result).toEqual({ min: 1, max: 9 });
    });

    it("should handle empty array", () => {
      const result = minMax([], (a, b) => a < b);
      expect(result).toBeNull();
    });

    it("should handle single element array", () => {
      const result = minMax([42], (a, b) => a < b);
      expect(result).toEqual({ min: 42, max: 42 });
    });

    it("should handle array with duplicate values", () => {
      const numbers = [1, 1, 1, 1];
      const result = minMax(numbers, (a, b) => a < b);
      expect(result).toEqual({ min: 1, max: 1 });
    });

    it("should handle custom objects", () => {
      const objects = [{ value: 3 }, { value: 1 }, { value: 4 }, { value: 2 }];
      const result = minMax(objects, (a, b) => a.value < b.value);
      expect(result).toEqual({
        min: { value: 1 },
        max: { value: 4 },
      });
    });
  });

  describe("with comparable values", () => {
    it("should find min and max in number array", () => {
      const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
      const result = minMaxComparable(numbers);
      expect(result).toEqual({ min: 1, max: 9 });
    });

    it("should find min and max in string array", () => {
      const strings = ["banana", "apple", "cherry", "date"];
      const result = minMaxComparable(strings);
      expect(result).toEqual({ min: "apple", max: "date" });
    });

    it("should handle dates", () => {
      const dates = [
        new Date("2023-01-01"),
        new Date("2023-06-15"),
        new Date("2023-03-30"),
      ];
      const result = minMaxComparable(dates);
      expect(result).toEqual({
        min: new Date("2023-01-01"),
        max: new Date("2023-06-15"),
      });
    });
  });
});
