/* eslint max-len: ["off"] */
const f = require('../dist/fetter');
const QUnit = require('qunitjs');

QUnit.test('Array', (assert) => {
  // Helper to determine if arrays are the same
  function same(_array1, _array2) {
    let result = _array1.length === _array2.length;
    if (result) {
      for (let i = 0; i < _array1.length; i += 1) {
        result = result && _array1[i] === _array2[i].value;
      }
    }
    return result;
  }
  // Generic
  assert.ok(same([], new f.Array().value));
  assert.ok(same(['Apple', 'Banana'], new f.Array(['Apple', 'Banana']).value));
  assert.ok(['Apple', 'Banana'][1] === new f.Array(['Apple', 'Banana']).get(1).value);
  assert.ok(['Apple', 'Banana'].length === new f.Array(['Apple', 'Banana']).length);

  // Overridden methods
  let _numbers1 = [1, 2, 3];
  const _numbers2 = new f.Array([1, 2, 3]);
  _numbers1.fill(1);
  _numbers2.fill(1);
  assert.ok(same(_numbers1, _numbers2.value));
  _numbers1.push(2);
  _numbers2.push(2);
  assert.ok(same(_numbers1, _numbers2.value));
  _numbers1.splice(2, 0, 3, 4);
  _numbers2.splice(2, 0, 3, 4);
  assert.ok(same(_numbers1, _numbers2.value));
  _numbers1.splice(1, 2, 5, 6, 7);
  _numbers2.splice(1, 2, 5, 6, 7);
  assert.ok(same(_numbers1, _numbers2.value));
  _numbers1.unshift(4, 5);
  _numbers2.unshift(4, 5);
  assert.ok(same(_numbers1, _numbers2.value));
  _numbers1 = _numbers1.concat(_numbers1);
  _numbers2.set(_numbers2.concat(_numbers2));
  assert.ok(same(_numbers1, _numbers2.value));

  // Enforced subtype
  const _numbers3 = new f.Array([], f.Number);
  _numbers3.push(1);
  assert.ok(same([1], _numbers3.value));
  assert.throws(() => {
    _numbers3.push('one');
  });
  _numbers3.push(new f.Number(2));
  assert.ok(same([1, 2], _numbers3.value));
});

QUnit.test('Date', (assert) => {
  // assert.ok(new Date().toISOString() === new f.Date().toISOString());
  assert.ok(new Date('December 17, 1995 03:24:00').toISOString() === new f.Date('December 17, 1995 03:24:00').toISOString());
  assert.ok(new Date('1995-12-17T03:24:00').toISOString() === new f.Date('1995-12-17T03:24:00').toISOString());
  assert.ok(new Date(1995, 11, 17).toISOString() === new f.Date(1995, 11, 17).toISOString());
  assert.ok(new Date(1995, 11, 17, 3, 24, 0).toISOString() === new f.Date(1995, 11, 17, 3, 24, 0).toISOString());
});
