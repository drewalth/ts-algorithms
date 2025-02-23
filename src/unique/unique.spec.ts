import { uniqued, uniquedOn, lazyUniqued, lazyUniquedOn } from './unique';

describe('unique functions', () => {
  describe('uniqued', () => {
    it('should remove duplicate elements', () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4];
      const result = uniqued(numbers);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty arrays', () => {
      const result = uniqued([]);
      expect(result).toEqual([]);
    });

    it('should handle arrays with no duplicates', () => {
      const result = uniqued([1, 2, 3, 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle arrays with all duplicates', () => {
      const result = uniqued([1, 1, 1, 1]);
      expect(result).toEqual([1]);
    });
  });

  describe('uniquedOn', () => {
    it('should remove elements with duplicate projections', () => {
      const objects = [
        { id: 1, group: 'a' },
        { id: 2, group: 'b' },
        { id: 3, group: 'a' },
        { id: 4, group: 'c' }
      ];
      const result = uniquedOn(objects, obj => obj.group);
      expect(result).toEqual([
        { id: 1, group: 'a' },
        { id: 2, group: 'b' },
        { id: 4, group: 'c' }
      ]);
    });

    it('should handle empty arrays', () => {
      const result = uniquedOn([], x => x);
      expect(result).toEqual([]);
    });

    it('should handle arrays with no duplicates', () => {
      const objects = [
        { id: 1, group: 'a' },
        { id: 2, group: 'b' },
        { id: 3, group: 'c' }
      ];
      const result = uniquedOn(objects, obj => obj.group);
      expect(result).toEqual(objects);
    });
  });

  describe('lazy uniqued', () => {
    it('should lazily remove duplicate elements', () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4];
      const result = [...lazyUniqued(numbers)];
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty sequences', () => {
      const result = [...lazyUniqued([])];
      expect(result).toEqual([]);
    });
  });

  describe('lazy uniquedOn', () => {
    it('should lazily remove elements with duplicate projections', () => {
      const objects = [
        { id: 1, group: 'a' },
        { id: 2, group: 'b' },
        { id: 3, group: 'a' },
        { id: 4, group: 'c' }
      ];
      const result = [...lazyUniquedOn(objects, obj => obj.group)];
      expect(result).toEqual([
        { id: 1, group: 'a' },
        { id: 2, group: 'b' },
        { id: 4, group: 'c' }
      ]);
    });

    it('should handle empty sequences', () => {
      const result = [...lazyUniquedOn([], x => x)];
      expect(result).toEqual([]);
    });
  });
});
