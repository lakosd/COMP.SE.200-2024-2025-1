import { expect } from "chai";
import map from "../src/map.js";

describe("Tests for map.js", () => {
  describe("Basic Functionality", () => {
    it("should apply the iteratee to each element of the array", () => {
      const square = (n) => n * n;
      expect(map([4, 8], square)).to.deep.equal([16, 64]);
    });

    it("should handle an empty array", () => {
      const identity = (x) => x;
      expect(map([], identity)).to.deep.equal([]);
    });

    it("should pass the correct arguments to the iteratee", () => {
      const results = [];
      const iteratee = (value, index, array) => {
        results.push({ value, index, array });
        return value;
      };
      map([1, 2, 3], iteratee);
      expect(results).to.deep.equal([
        { value: 1, index: 0, array: [1, 2, 3] },
        { value: 2, index: 1, array: [1, 2, 3] },
        { value: 3, index: 2, array: [1, 2, 3] },
      ]);
    });
  });

  describe("Edge Cases", () => {
    it("should return an empty array if the input is null", () => {
      const identity = (x) => x;
      expect(map(null, identity)).to.deep.equal([]);
    });

    it("should return an empty array if the input is undefined", () => {
      const identity = (x) => x;
      expect(map(undefined, identity)).to.deep.equal([]);
    });

    it("should not modify the original array", () => {
      const input = [1, 2, 3];
      const double = (n) => n * 2;
      map(input, double);
      expect(input).to.deep.equal([1, 2, 3]);
    });
  });

  describe("Custom Iteratee Functions", () => {
    it("should work with a simple transformation function", () => {
      const double = (n) => n * 2;
      expect(map([1, 2, 3], double)).to.deep.equal([2, 4, 6]);
    });

    it("should work with an iteratee that relies on the index", () => {
      const addIndex = (value, index) => value + index;
      expect(map([10, 20, 30], addIndex)).to.deep.equal([10, 21, 32]);
    });

    it("should work with an iteratee that relies on the array", () => {
      const sumWithArrayLength = (value, _, array) => value + array.length;
      expect(map([1, 2, 3], sumWithArrayLength)).to.deep.equal([4, 5, 6]);
    });
  });

  describe("Special Data Types", () => {
    it("should handle arrays with different data types", () => {
      const stringify = (x) => String(x);
      expect(map([1, "a", true, null], stringify)).to.deep.equal([
        "1",
        "a",
        "true",
        "null",
      ]);
    });

    it("should work with nested arrays", () => {
      const flatten = (arr) => arr.join("-");
      expect(map([[1, 2], [3, 4], [5]], flatten)).to.deep.equal([
        "1-2",
        "3-4",
        "5",
      ]);
    });
  });
});
