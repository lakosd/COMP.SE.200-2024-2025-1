import { expect } from "chai";
import get from "../src/get.js";

describe("Tests for get.js", () => {
  describe("Basic Functionality", () => {
    it("should retrieve a nested value with a string path", () => {
      const obj = { a: { b: { c: 3 } } };
      expect(get(obj, "a.b.c")).to.equal(3);
    });

    it("should retrieve a nested value with an array path", () => {
      const obj = { a: [{ b: { c: 3 } }] };
      expect(get(obj, ["a", "0", "b", "c"])).to.equal(3);
    });

    it("should return undefined if the path does not exist", () => {
      const obj = { a: { b: { c: 3 } } };
      expect(get(obj, "a.b.d")).to.be.undefined;
    });

    it("should return the default value if the resolved value is undefined", () => {
      const obj = { a: { b: { c: 3 } } };
      expect(get(obj, "a.b.d", "default")).to.equal("default");
    });
  });

  describe("Edge Cases with Paths", () => {
    it("should handle empty string as a path and return undefined", () => {
      const obj = { a: { b: 3 } };
      expect(get(obj, "")).to.be.undefined;
    });

    it("should handle empty array as a path and return the original object", () => {
      const obj = { a: { b: 3 } };
      expect(get(obj, [])).to.equal(obj);
    });

    it("should handle paths with special characters", () => {
      const obj = { "a.b": { c: 3 } };
      expect(get(obj, ["a.b", "c"])).to.equal(3);
    });

    it("should handle paths with numeric indices in strings", () => {
      const obj = { a: [{ b: 3 }] };
      expect(get(obj, "a[0].b")).to.equal(3);
    });

    it("should handle paths with trailing dots", () => {
      const obj = { a: { b: { c: 3 } } };
      expect(get(obj, "a.b.c.")).to.equal(3);
    });
  });

  describe("Null and Undefined Handling", () => {
    it("should return the default value if the object is null", () => {
      expect(get(null, "a.b", "default")).to.equal("default");
    });

    it("should return the default value if the object is undefined", () => {
      expect(get(undefined, "a.b", "default")).to.equal("default");
    });

    it("should return undefined if the object is null and no default value is provided", () => {
      expect(get(null, "a.b")).to.be.undefined;
    });

    it("should return undefined if the object is undefined and no default value is provided", () => {
      expect(get(undefined, "a.b")).to.be.undefined;
    });
  });

  describe("Special Data Types", () => {
    it("should retrieve values from arrays using numeric indices", () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      expect(get(arr, "[0][2]")).to.equal(3);
    });

    it("should handle functions as values", () => {
      const obj = { a: { b: () => 42 } };
      expect(get(obj, "a.b")()).to.equal(42);
    });

    it("should handle objects with prototype properties", () => {
      const proto = { b: 2 };
      const obj = Object.create(proto);
      expect(get(obj, "b")).to.equal(2);
    });
  });
});
