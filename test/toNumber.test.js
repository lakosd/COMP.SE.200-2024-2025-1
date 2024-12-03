import { expect } from 'chai';
import toNumber from '../src/toNumber.js';

describe('Tests for toNumber.js', function() {
  it('should convert an integer given as a string', function() {
    expect(toNumber('123')).to.equal(123);
  });

  it('should convert a negative integer given as a string', function() {
    expect(toNumber('-123')).to.equal(-123);
  });

  it('should ignore leading/trailing whitespace', function() {
    expect(toNumber(' 123 ')).to.equal(123);
  });

  it('should convert a float given as a string', function() {
    expect(toNumber('12.3')).to.equal(12.3);
  });

  it('should convert a float with 0 in the fractional part, given as a string', function() {
    expect(toNumber('12.00')).to.equal(12);
  });

  it('should convert a number given in scientific notation with negative power', function() {
    expect(toNumber('123e-1')).to.equal(12.3);
  });

  it('should convert a number given in scientific notation with positive power', function() {
    expect(toNumber('123e1')).to.equal(1230);
  });

  it('should convert an empty-string to 0', function() {
    expect(toNumber('')).to.equal(0);
  });

  it('should convert null to 0', function() {
    expect(toNumber(null)).to.equal(0);
  });

  it('should convert a number given in hexadecimal notation', function() {
    expect(toNumber('0x11')).to.equal(17);
  });

  it('should convert a number given in binary notation', function() {
    expect(toNumber('0b11')).to.equal(3);
  });

  it('should convert a number given in octal notation', function() {
    expect(toNumber('0o11')).to.equal(9);
  });

  it('should convert the string "Infinity" to Infinity', function() {
    expect(toNumber('Infinity')).to.equal(Infinity);
  });

  it('should convert the string "-Infinity" to -Infinity', function() {
    expect(toNumber('-Infinity')).to.equal(-Infinity);
  });

  it('should convert a non-special string to NaN', function() {
    expect(toNumber('foo')).to.be.NaN;
  });

  it('should convert undefined to NaN', function() {
    expect(toNumber(undefined)).to.be.NaN;
  });
});

