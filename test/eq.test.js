import { expect } from "chai";
import eq from "../src/eq.js";

describe("eq", () => {
  describe("Basic Functionality", () => {
    it("should return true for primitive values that are strictly equal", () => {
      expect(eq(1, 1)).to.be.true;
      expect(eq("a", "a")).to.be.true;
      expect(eq(true, true)).to.be.true;
    });

    it("should return false for primitive values that are not strictly equal", () => {
      expect(eq(1, 2)).to.be.false;
      expect(eq("a", "b")).to.be.false;
      expect(eq(true, false)).to.be.false;
    });
  });

  describe("Object References", () => {
    it("should return true when comparing the same object reference", () => {
      const obj = { a: 1 };
      expect(eq(obj, obj)).to.be.true;
    });

    it("should return false when comparing different objects with the same content", () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 1 };
      expect(eq(obj1, obj2)).to.be.false;
    });
  });

  describe("Special Cases", () => {
    it("should return true when comparing NaN with NaN", () => {
      expect(eq(NaN, NaN)).to.be.true;
    });

    it("should return false when comparing primitive values and their object wrappers", () => {
      expect(eq("a", Object("a"))).to.be.false;
      expect(eq(1, Object(1))).to.be.false;
      expect(eq(true, Object(true))).to.be.false;
    });

    it("should return false when comparing null and undefined", () => {
      expect(eq(null, undefined)).to.be.false;
    });
  });

  describe("Edge Cases", () => {
    it("should return false for values of different types", () => {
      expect(eq(1, "1")).to.be.false;
      expect(eq(true, 1)).to.be.false;
      expect(eq(null, 0)).to.be.false;
    });

    it("should return true for zero and negative zero", () => {
      expect(eq(0, -0)).to.be.true;
      expect(eq(-0, 0)).to.be.true;
    });

    it("should return false for positive zero and NaN", () => {
      expect(eq(0, NaN)).to.be.false;
    });
  });
});
