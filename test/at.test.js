import { expect } from "chai";
import at from "../src/at.js";

describe("Tests for at.js", () => {
  describe("Basic Functionality", () => {
    it("should retrieve values based on single-level paths", () => {
      const object = { a: 1, b: 2, c: 3 };
      expect(at(object, ["a", "b"])).to.deep.equal([1, 2]);
    });

    it("should retrieve values based on nested paths", () => {
      const object = { a: { b: { c: 3 } }, d: 4 };
      expect(at(object, ["a.b.c", "d"])).to.deep.equal([3, 4]);
    });
  });

  describe("Array and Mixed Object Paths", () => {
    it("should retrieve values from arrays within objects", () => {
      const object = { a: [{ b: { c: 3 } }, 4] };
      expect(at(object, ["a[0].b.c", "a[1]"])).to.deep.equal([3, 4]);
    });

    it("should handle objects with arrays as keys", () => {
      const object = { "a[0]": { b: 2 } };
      expect(at(object, ["a[0].b"])).to.deep.equal([undefined]);
    });
  });

  describe("Edge Cases", () => {
    it("should return undefined for non-existent paths", () => {
      const object = { a: 1 };
      expect(at(object, ["b"])).to.deep.equal([undefined]);
    });

    it("should handle null or undefined input objects", () => {
      expect(at(null, ["a"])).to.deep.equal([undefined]);
      expect(at(undefined, ["a"])).to.deep.equal([undefined]);
    });

    it("should handle empty paths", () => {
      const object = { a: 1 };
      expect(at(object)).to.deep.equal([]);
    });

    it("should handle empty object input", () => {
      const object = {};
      expect(at(object, ["a"])).to.deep.equal([undefined]);
    });
  });

  describe("Flattening Behavior", () => {
    it("should handle multiple paths passed as separate arguments", () => {
      const object = { a: 1, b: 2 };
      expect(at(object, "a", "b")).to.deep.equal([1, 2]);
    });

    it("should handle paths passed as arrays", () => {
      const object = { a: 1, b: 2, c: 3 };
      expect(at(object, ["a", "b"], "c")).to.deep.equal([1, 2, 3]);
    });

    it("should correctly flatten nested path arrays", () => {
      const object = { a: 1, b: { c: 2 } };
      expect(at(object, [["a"], ["b.c"]])).to.deep.equal([1, 2]);
    });
  });

  describe("Complex Objects", () => {
    it("should retrieve values from deeply nested objects", () => {
      const object = { a: { b: { c: { d: 5 } } } };
      expect(at(object, ["a.b.c.d"])).to.deep.equal([5]);
    });

    it("should handle objects with numeric keys", () => {
      const object = { 0: { a: 1 }, 1: { b: 2 } };
      expect(at(object, ["0.a", "1.b"])).to.deep.equal([1, 2]);
    });
  });
});
