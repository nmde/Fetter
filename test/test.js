/* eslint max-len: ["off"] */
/* eslint no-new-wrappers: ["off"] */
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

QUnit.test('Boolean', (assert) => {
  assert.ok(new Boolean().valueOf() === new f.Boolean().value);
  assert.ok(new Boolean(0).valueOf() === new f.Boolean(0).value);
  assert.ok(new Boolean(null).valueOf() === new f.Boolean(null).value);
  assert.ok(new Boolean('').valueOf() === new f.Boolean('').value);
  assert.ok(new Boolean(false).valueOf() === new f.Boolean(false).value);
  assert.ok(new f.Boolean(false).value === false);
  assert.ok(new Boolean(true).valueOf() === new f.Boolean(true).value);
  assert.ok(new Boolean('true').valueOf() === new f.Boolean('true').value);
  assert.ok(new Boolean('false').valueOf() === new f.Boolean('false').value);
  assert.ok(new Boolean([]).valueOf() === new f.Boolean([]).value);
  assert.ok(new Boolean({}).valueOf() === new f.Boolean({}).value);
  assert.ok(new f.Boolean(true).value === true);
});

QUnit.test('Date', (assert) => {
  // assert.ok(new Date().toISOString() === new f.Date().toISOString());
  assert.ok(new Date('December 17, 1995 03:24:00').toISOString() === new f.Date('December 17, 1995 03:24:00').toISOString());
  assert.ok(new Date('1995-12-17T03:24:00').toISOString() === new f.Date('1995-12-17T03:24:00').toISOString());
  assert.ok(new Date(1995, 11, 17).toISOString() === new f.Date(1995, 11, 17).toISOString());
  assert.ok(new Date(1995, 11, 17, 3, 24, 0).toISOString() === new f.Date(1995, 11, 17, 3, 24, 0).toISOString());
});

QUnit.test('Function', (assert) => {
  const _function1 = (a, b) => a + b;
  const _function2 = new f.Function((a, b) => a + b);
  assert.equal(_function1(1, 3), _function2.call(1, 3));
  const _function3 = () => x => x;
  const _function4 = new f.Function(() => new f.Function(x => x));
  assert.equal(_function3()(4), _function4.call().call(4));
});

QUnit.test('Object', (assert) => {
  const _obj1 = {
    foo: 'bar',
  };
  const _obj2 = new f.Object({
    foo: new f.String('bar'),
  }, f.String);
  assert.equal(_obj1.foo, _obj2.get(new f.String('foo')).value);
});
