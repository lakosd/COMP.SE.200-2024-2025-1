import { expect } from 'chai';
import toString from '../src/toString.js';

describe('Tests for toString.js', function() {
  it('should convert null to an empty string', function() {
    expect(toString(null)).to.equal('');
  });

  it('should convert undefined to an empty string', function() {
    expect(toString(undefined)).to.equal('');
  });

  it('should convert -0 to "-0"', function() {
    expect(toString(-0)).to.equal('-0');
  });

  it('should convert an array to a comma-separated string', function() {
    expect(toString([1, 2, 3])).to.equal('1,2,3');
  });

  it('should convert a number to a string', function() {
    expect(toString(123)).to.equal('123');
  });

  it('should convert a string to itself', function() {
    expect(toString('abc')).to.equal('abc');
  });

  it('should convert a boolean true to "true"', function() {
    expect(toString(true)).to.equal('true');
  });

  it('should convert a boolean false to "false"', function() {
    expect(toString(false)).to.equal('false');
  });

  it('should convert an object to "[object Object]"', function() {
    expect(toString({})).to.equal('[object Object]');
  });

  it('should convert a symbol to its string representation', function() {
    const symbol = Symbol('sym');
    expect(toString(symbol)).to.equal('Symbol(sym)');
  });

  it('should convert a function to its string representation', function() {
    function testFn() {}
    expect(toString(testFn)).to.equal('function testFn() {}');
  });

  it('should convert NaN to "NaN"', function() {
    expect(toString(NaN)).to.equal('NaN');
  });

  it('should convert Infinity to "Infinity"', function() {
    expect(toString(Infinity)).to.equal('Infinity');
  });

  it('should convert -Infinity to "-Infinity"', function() {
    expect(toString(-Infinity)).to.equal('-Infinity');
  });
});

