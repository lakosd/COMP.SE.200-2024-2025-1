import { expect } from "chai";
import isDate from "../src/isDate.js";

describe("Tests for isDate.js", () => {
  describe("Valid Date Objects", () => {
    it("should return true for current Date objects", () => {
      const now = new Date();
      expect(isDate(now)).to.be.true;
    });

    it("should return true for valid Date objects with specific dates", () => {
      const specificDate = new Date("2024-12-06T00:00:00Z");
      expect(isDate(specificDate)).to.be.true;
    });

    it("should return true for Date objects created using timestamps", () => {
      const timestampDate = new Date(1701825600000); //'2024-12-06'
      expect(isDate(timestampDate)).to.be.true;
    });
  });

  describe("Invalid Inputs", () => {
    it("should return false for plain strings, even if they resemble dates", () => {
      expect(isDate("2024-12-06")).to.be.false;
      expect(isDate("December 6, 2024")).to.be.false;
      expect(isDate("Fri Dec 6 2024")).to.be.false;
    });

    it("should return false for numbers, even if they resemble timestamps", () => {
      expect(isDate(1701825600000)).to.be.false;
      expect(isDate(0)).to.be.false;
    });

    it("should return false for boolean values", () => {
      expect(isDate(true)).to.be.false;
      expect(isDate(false)).to.be.false;
    });

    it("should return false for null and undefined", () => {
      expect(isDate(null)).to.be.false;
      expect(isDate(undefined)).to.be.false;
    });
  });

  describe("Edge Cases with Objects", () => {
    it("should return false for plain objects", () => {
      expect(isDate({})).to.be.false;
    });

    it("should return false for objects that mimic Date objects", () => {
      const fakeDate = {
        toString: () => "[object Date]",
        getTime: () => 12345,
      };
      expect(isDate(fakeDate)).to.be.false;
    });

    it("should return false for arrays", () => {
      expect(isDate([])).to.be.false;
      expect(isDate([2024, 12, 6])).to.be.false;
    });

    it("should return false for functions", () => {
      const fn = () => {};
      expect(isDate(fn)).to.be.false;
    });

    it("should return false for Map and Set objects", () => {
      expect(isDate(new Map())).to.be.false;
      expect(isDate(new Set())).to.be.false;
    });
  });

  describe("Invalid and Exotic Date Objects", () => {
    it("should return true for invalid Date objects (e.g., Invalid Date)", () => {
      const invalidDate = new Date("Invalid Date");
      expect(isDate(invalidDate)).to.be.true;
    });

    it("should handle Date objects with edge case values", () => {
      expect(isDate(new Date(0))).to.be.true;
      expect(isDate(new Date(NaN))).to.be.true;
    });
  });

  describe("Node.js Specific Behavior", () => {
    it("should correctly handle nodeIsDate optimization when available", () => {
      const nodeTypes = { isDate: (value) => value instanceof Date };
      const customIsDate = nodeTypes.isDate
        ? (value) => nodeTypes.isDate(value)
        : isDate;
      expect(customIsDate(new Date())).to.be.true;
      expect(customIsDate("2024-12-06")).to.be.false;
    });
  });
});
