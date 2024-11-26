import { assert } from 'chai';

describe('Sample Tests', function() {
  it('should pass a simple assertion', function() {
    const result = 2 + 2;
    assert.equal(result, 4, '2 + 2 should equal 4');
  });

  it('should pass an assertion with a custom error message', function() {
    const result = 5 * 5;
    assert.strictEqual(result, 25, '5 * 5 should equal 25');
  });

  it('should fail an assertion', function() {
    const result = 10 / 2;
    assert.equal(result, 5, '10 divided by 2 should equal 5');
  });

  describe('Array Tests', function() {
    it('should check array length', function() {
      const arr = [1, 2, 3];
      assert.lengthOf(arr, 3, 'Array should have 3 elements');
    });

    it('should check array contains element', function() {
      const arr = [1, 2, 3];
      assert.include(arr, 2, 'Array should include 2');
    });
  });

  it('should use deep equality comparison', function() {
    const obj1 = { foo: 'bar' };
    const obj2 = { foo: 'bar' };
    assert.deepEqual(obj1, obj2, 'Objects should be deeply equal');
  });

  it('should use strict equality comparison', function() {
    const str1 = 'hello';
    const str2 = 'hello';
    assert.strictEqual(str1, str2, 'Strings should be strictly equal');
  });
});

