import { expect } from 'chai';
import filter from '../src/filter.js';

describe('Tests for filter.js', function() {
  it('should return an empty array for an empty input array', function() {
    const result = filter([], (_elem) => true);
    expect(result).to.deep.equal([]);
  });

  it('should return an empty array for an always-false predicate', function() {
    const result = filter(['a', 'b', 'c'], (_elem) => false);
    expect(result).to.deep.equal([]);
  });

  it('should return the input array for an always-true predicate', function() {
    const array = ['a', 'b', 'c'];
    const result = filter(array, (_elem) => true);
    expect(result).to.deep.equal(array);
  });

  it('should filter numbers divisible by 3', function() {
    const result = filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n % 3 == 0);
    expect(result).to.deep.equal([3, 6, 9]);
  });

  it('should filter active users from an array of users where the first one is the only active', function() {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred', 'active': false }
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).to.deep.equal([{ 'user': 'barney', 'active': true }]);
  });

  it('should filter active users from an array of users where the last one is the only active', function() {
    const users = [
      { 'user': 'fred', 'active': false },
      { 'user': 'barney', 'active': true }
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).to.deep.equal([{ 'user': 'barney', 'active': true }]);
  });
});

