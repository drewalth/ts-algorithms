import { stridingBy } from "./stride";

describe("stridingBy", () => {
  // Basic functionality tests
  it("should return all elements with stride of 1", () => {
    const input = [1, 2, 3, 4, 5];
    expect(stridingBy(input, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return every second element with stride of 2", () => {
    const input = [1, 2, 3, 4, 5, 6];
    expect(stridingBy(input, 2)).toEqual([1, 3, 5]);
  });

  it("should return every third element with stride of 3", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(stridingBy(input, 3)).toEqual([1, 4, 7]);
  });

  // Edge cases
  it("should throw an error if stride is 0", () => {
    expect(() => stridingBy([1, 2, 3], 0)).toThrow(
      "Stride must be greater than 0",
    );
  });

  it("should throw an error if stride is negative", () => {
    expect(() => stridingBy([1, 2, 3], -1)).toThrow(
      "Stride must be greater than 0",
    );
  });

  it("should handle empty arrays", () => {
    expect(stridingBy([], 2)).toEqual([]);
  });

  it("should handle stride larger than array length", () => {
    const input = [1, 2, 3];
    expect(stridingBy(input, 4)).toEqual([1]);
  });

  it("should handle stride equal to array length", () => {
    const input = [1, 2, 3];
    expect(stridingBy(input, 3)).toEqual([1]);
  });

  // Type tests
  it("should work with arrays of strings", () => {
    const input = ["a", "b", "c", "d"];
    expect(stridingBy(input, 2)).toEqual(["a", "c"]);
  });

  it("should work with arrays of objects", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    expect(stridingBy(input, 2)).toEqual([{ id: 1 }, { id: 3 }]);
  });

  // Large dataset tests
  it("should handle large arrays efficiently", () => {
    // Create array of 6000 objects
    const largeInput = Array.from({ length: 6000 }, (_, i) => ({ id: i }));
    const result = [...stridingBy(largeInput, 10)];

    // Verify result length
    expect(result.length).toBe(600); // 6000/10 = 600

    // Verify first, middle and last elements
    expect(result[0]).toEqual({ id: 0 });
    expect(result[299]).toEqual({ id: 2990 });
    expect(result[599]).toEqual({ id: 5990 });
  });

  it("should maintain performance with different stride values", () => {
    const largeInput = Array.from({ length: 6000 }, (_, i) => i);

    // Test with different strides
    const result1 = [...stridingBy(largeInput, 2)];
    const result2 = [...stridingBy(largeInput, 100)];

    expect(result1.length).toBe(3000); // 6000/2
    expect(result2.length).toBe(60); // 6000/100

    // Verify the stride pattern is correct
    expect(result1[0]).toBe(0);
    expect(result1[1]).toBe(2);
    expect(result1[2]).toBe(4);

    expect(result2[0]).toBe(0);
    expect(result2[1]).toBe(100);
    expect(result2[2]).toBe(200);
  });

  // Lazy evaluation tests
  describe("lazy evaluation", () => {
    it("should return an iterator when lazy option is true", () => {
      const input = [1, 2, 3, 4, 5];
      const result = stridingBy(input, 2, { lazy: true });
      expect(result[Symbol.iterator]).toBeDefined();
    });

    it("should yield correct values when iterating", () => {
      const input = [1, 2, 3, 4, 5];
      const iterator = stridingBy(input, 2, { lazy: true });
      const result = [...iterator];
      expect(result).toEqual([1, 3, 5]);
    });

    it("should support multiple iterations", () => {
      const input = [1, 2, 3, 4, 5];
      const iterator = stridingBy(input, 2, { lazy: true });

      // First iteration
      const result1 = [...iterator];
      expect(result1).toEqual([1, 3, 5]);

      // Second iteration (should create new iterator)
      const result2 = [...stridingBy(input, 2, { lazy: true })];
      expect(result2).toEqual([1, 3, 5]);
    });

    it("should handle empty arrays with lazy evaluation", () => {
      const iterator = stridingBy([], 2, { lazy: true });
      const result = [...iterator];
      expect(result).toEqual([]);
    });

    it("should handle large arrays with lazy evaluation", () => {
      const largeInput = Array.from({ length: 6000 }, (_, i) => i);
      const iterator = stridingBy(largeInput, 100, { lazy: true });

      let count = 0;
      let lastValue = -1;

      // Test iteration without converting to array
      for (const value of iterator) {
        if (count === 0) expect(value).toBe(0);
        lastValue = value;
        count++;
      }

      expect(count).toBe(60); // 6000/100
      expect(lastValue).toBe(5900);
    });

    it("should throw error with invalid stride in lazy mode", () => {
      expect(() => stridingBy([1, 2, 3], 0, { lazy: true })).toThrow(
        "Stride must be greater than 0",
      );
      expect(() => stridingBy([1, 2, 3], -1, { lazy: true })).toThrow(
        "Stride must be greater than 0",
      );
    });

    it("should work with different types in lazy mode", () => {
      const input = ["a", "b", "c", "d", "e"];
      const iterator = stridingBy(input, 2, { lazy: true });
      expect([...iterator]).toEqual(["a", "c", "e"]);

      const objectInput = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const objectIterator = stridingBy(objectInput, 2, { lazy: true });
      expect([...objectIterator]).toEqual([{ id: 1 }, { id: 3 }]);
    });
  });
});
