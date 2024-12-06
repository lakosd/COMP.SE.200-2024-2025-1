import { expect } from 'chai';
import chunk from '../src/chunk.js';

describe('Tests for chunk.js', function() {
  it('should call chunk with size 0 and return an empty array', function() {
    const array = ['a', 'b', 'c'];
    const size = 0;
    expect(chunk(array, size)).to.be.an('array').that.is.empty;
  });

  it('should call chunk with negative size and return an empty array', function() {
    const array = ['a', 'b', 'c'];
    const size = -1;
    expect(chunk(array, size)).to.be.an('array').that.is.empty;
  });

  it('should call chunk with a size larger than the array\'s length and return the original array', function() {
    const array = ['a', 'b', 'c'];
    const size = 5;
    expect(chunk(array, size)).to.deep.equal(array);
  });

  it('should call chunk on an empty array and return an empty array', function() {
    const array = [];
    const size = 2;
    expect(chunk(array, size)).to.be.an('array').that.is.empty;
  });

  it('should call chunk with size 1 and return the original elements wrapped in single-element lists', function() {
    const array = ['a', 'b', 'c'];
    expect(chunk(array)).to.deep.equal([['a'], ['b'], ['c']]);
  });

  it('should call chunk with no size given, defaulting to 1', function() {
    const array = ['a', 'b', 'c'];
    expect(chunk(array)).to.deep.equal([['a'], ['b'], ['c']]);
  });

  it('should call chunk with a size that evenly divides the array\'s length', function() {
    const array = ['a', 'b', 'c', 'd', 'e', 'f'];
    const size = 2;
    expect(chunk(array, size)).to.deep.equal([['a', 'b'], ['c', 'd'], ['e', 'f']]);
  });

  it('should call chunk with a size that does not evenly divide the array\'s length', function() {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const size = 2;
    expect(chunk(array, size)).to.deep.equal([['a', 'b'], ['c', 'd'], ['e']]);
  });

  it('should call chunk with a size of the array\'s length', function() {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const size = 5;
    expect(chunk(array, size)).to.deep.equal([['a', 'b', 'c', 'd', 'e']]);
  });
});

