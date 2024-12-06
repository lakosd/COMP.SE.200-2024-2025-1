import { expect } from 'chai';
import drop from '../src/drop.js';

describe('Tests for drop.js', function() {
  it('should call drop with no `n` given and default to 1', function() {
    const array = [1, 2, 3];
    expect(drop(array)).to.deep.equal([2, 3]);
  });

  it('should call drop with `n` as 0 and return the original array', function() {
    const array = [1, 2, 3];
    const n = 0;
    expect(drop(array, n)).to.deep.equal([1, 2, 3]);
  });

  it('should call drop with `n` greater than the array length and return an empty array', function() {
    const array = [1, 2, 3];
    const n = 5;
    expect(drop(array, n)).to.be.an('array').that.is.empty;
  });

  it('should call drop with `n` equal to the array length and return an empty array', function() {
    const array = [1, 2, 3];
    const n = 3;
    expect(drop(array, n)).to.be.an('array').that.is.empty;
  });

  it('should call drop with `n` as a negative number and return the original array', function() {
    const array = [1, 2, 3];
    const n = -1;
    expect(drop(array, n)).to.deep.equal([1, 2, 3]);
  });

  it('should call drop on an empty array and return an empty array', function() {
    const array = [];
    const n = 2;
    expect(drop(array, n)).to.be.an('array').that.is.empty;
  });

  it('should call drop with `n` as 1 and return the array with the first element removed', function() {
    const array = [1, 2, 3];
    const n = 1;
    expect(drop(array, n)).to.deep.equal([2, 3]);
  });

  it('should call drop with `n` less than the array length, removing multiple elements', function() {
    const array = [1, 2, 3, 4, 5];
    const n = 3;
    expect(drop(array, n)).to.deep.equal([4, 5]);
  });
});

