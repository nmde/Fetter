/* eslint max-len: ["off"] */
/* eslint no-new-wrappers: ["off"] */
const f = require('../dist/fetter');
const QUnit = require('qunitjs');
require('./includes');

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
  function a(...args) {
    return Array.from(args);
  }
  function b(...args) {
    return f.Array.from(args);
  }

  // Array.from
  assert.ok(same(Array.from(['a', 'b', 'c']), f.Array.from(['a', 'b', 'c']).value));
  assert.ok(same(Array.from(['a', 'b', 'c']), f.Array.from(new f.Array([new f.String('a'), new f.String('b'), new f.String('c')], f.String)).value));
  assert.ok(same(Array.from('foo'), f.Array.from('foo').value));
  assert.ok(same(Array.from('foo'), f.Array.from(new f.String('foo')).value));
  assert.ok(same(Array.from(new Set(['foo', this])), f.Array.from(new Set(['foo', this])).value));
  assert.ok(same(Array.from(new Set(['foo', this])), f.Array.from(new Set([new f.String('foo'), this])).value));
  // @TODO: f.Map
  // assert.ok(same(Array.from(new Map([1, 2], [2, 4], [4, 8])), f.Array.from(new Map([1, 2], [2, 4], [4, 8])).value));
  // assert.ok(same(Array.from(new Map([1, 2], [2, 4], [4, 8])), f.Array.from(new Map(new f.Array([new f.Number(1), new f.Number(2)], f.Number), new f.Array([new f.Number(2), new f.Number(4)], f.Number), new f.Array([new f.Number(4), new f.Number(8)], f.Number))).value));
  assert.ok(same(Array.from(a()), f.Array.from(a()).value));
  assert.ok(same(Array.from(a()), f.Array.from(b()).value));
  assert.ok(same(Array.from([1, 2, 3], x => x + x), f.Array.from([1, 2, 3], x => x + x).value));
  assert.ok(same(Array.from([1, 2, 3], x => x + x), f.Array.from(new f.Array([new f.Number(1), new f.Number(2), new f.Number(3)], f.Number), new f.Function(x => x + x)).value));

  // Array.isArray
  assert.equal(Array.isArray([1, 2, 3]), f.Array.isArray([1, 2, 3]).value);
  assert.equal(Array.isArray([1, 2, 3]), f.Array.isArray(new f.Array([new f.Number(1), new f.Number(2), new f.Number(3)], f.Number)).value);
  assert.equal(Array.isArray({ foo: 123 }), f.Array.isArray({ foo: 123 }).value);
  assert.equal(Array.isArray({ foo: 123 }), f.Array.isArray(new f.Object({ foo: 123 }, f.Number)).value);
  assert.equal(Array.isArray('foobar'), f.Array.isArray('foobar').value);
  assert.equal(Array.isArray('foobar'), f.Array.isArray(new f.String('foobar')).value);
  assert.equal(Array.isArray(undefined), f.Array.isArray(undefined).value);
  assert.equal(Array.isArray([]), f.Array.isArray([]).value);
  assert.equal(Array.isArray([]), f.Array.isArray(new f.Array()).value);
  assert.equal(Array.isArray([1]), f.Array.isArray([1]).value);
  assert.equal(Array.isArray([1]), f.Array.isArray(new f.Array([new f.Number(1)], f.Number)).value);
  assert.equal(Array.isArray(), f.Array.isArray().value);

  // Array.of
  assert.ok(same(Array.of(7), f.Array.of(7).value));
  assert.ok(same(Array.of(7), f.Array.of(new f.Number(7)).value));
  assert.ok(same(Array.of(1, 2, 3), f.Array.of(1, 2, 3).value));
  assert.ok(same(Array.of(1, 2, 3), f.Array.of(new f.Number(1), new f.Number(2), new f.Number(3)).value));

  // Array.prototype.copyWithin
  assert.ok(same(['alpha', 'bravo', 'charlie', 'delta'].copyWithin(2, 0), new f.Array([new f.String('alpha'), new f.String('bravo'), new f.String('charlie'), new f.String('delta')], f.String).copyWithin(2, 0).value));
  assert.ok(same([1, 2, 3, 4, 5].copyWithin(-2), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(-2).value));
  assert.ok(same([1, 2, 3, 4, 5].copyWithin(0, 3), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(0, 3).value));
  assert.ok(same([1, 2, 3, 4, 5].copyWithin(0, 3, 4), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(0, 3, 4).value));
  assert.ok(same([1, 2, 3, 4, 5].copyWithin(-2, -3, -1), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(-2, -3, -1).value));

  // Array.prototype.fill
  assert.ok(same([1, 2, 3].fill(1), new f.Array([1, 2, 3], f.Number).fill(new f.Number(1)).value));
  assert.ok(same([1, 2, 3].fill(4, 1), new f.Array([1, 2, 3], f.Number).fill(new f.Number(4), new f.Number(1)).value));
  assert.throws(() => new f.Array([1, 2, 3], f.Number).fill('foo'));
  assert.throws(() => new f.Array([1, 2, 3], f.Number).fill(new f.String('foo')));
  assert.ok(same([1, 2, 3].fill(4, 1, 2), new f.Array([1, 2, 3], f.Number).fill(4, 1, 2).value));
  assert.ok(same([1, 2, 3].fill(4, -3, -2), new f.Array([1, 2, 3], f.Number).fill(4, -3, -2).value));

  // Array.prototype.pop
  const _a1 = [1, 2, 3];
  const _a2 = new f.Array([1, 2, 3]);
  _a1.pop();
  _a2.pop();
  assert.ok(same(_a1, _a2.value));

  // Array.prototype.push
  const _numbers1 = [1, 2, 3];
  const _numbers2 = new f.Array([1, 2, 3], f.Number);
  _numbers1.push(4);
  _numbers2.push(new f.Number(4));
  assert.ok(same(_numbers1, _numbers2.value));
  const _sports1 = ['soccer', 'baseball'];
  const _sports2 = new f.Array(['soccer', 'baseball'], f.String);
  _sports1.push('football', 'swimming');
  _sports2.push('football', 'swimming');
  assert.ok(same(_sports1, _sports2.value));
  const _vegetables1 = ['parsnip', 'potato'];
  const _vegetables2 = new f.Array(['parsnip', 'potato']);
  Array.prototype.push.apply(_vegetables1, ['celery', 'beetroot']);
  f.Array.prototype.push.apply(_vegetables2, new f.Array(['celery', 'beetroot']));

  // Array.prototype.reverse
  const _a = ['one', 'two', 'three'];
  const _b = new f.Array(['one', 'two', 'three']);
  _a.reverse();
  _b.reverse();
  assert.ok(same(_a, _b.value));

  // Array.prototype.shift
  const _c = [1, 2, 3];
  const _d = new f.Array([1, 2, 3]);
  const _e = _c.shift();
  const _f = _d.shift();
  assert.ok(same(_c, _d.value));
  assert.equal(_e, _f.value);

  // Array.prototype.sort
  const _fruit1 = ['cherries', 'apples', 'bananas'];
  const _fruit2 = new f.Array(['cherries', 'apples', 'bananas']);
  _fruit1.sort();
  _fruit2.sort();
  assert.ok(same(_fruit1, _fruit2.value));
  const _scores1 = [1, 10, 21, 2];
  const _scores2 = new f.Array([1, 10, 21, 2]);
  _scores1.sort();
  _scores2.sort();
  assert.ok(same(_scores1, _scores2.value));

  // Array.prototype.splice
  const _myFish1 = ['angel', 'clown', 'mandarin', 'sturgeon'];
  const _myFish2 = new f.Array(['angel', 'clown', 'mandarin', 'sturgeon']);
  const _removed1 = _myFish1.splice(2, 0, 'drum');
  const _removed2 = _myFish2.splice(new f.Number(2), new f.Number(0), new f.String('drum'));
  assert.ok(same(_myFish1, _myFish2.value));
  assert.ok(same(_removed1, _removed2.value));
  const _myFish3 = ['angel', 'clown', 'mandarin', 'sturgeon'];
  const _myFish4 = new f.Array(['angel', 'clown', 'mandarin', 'sturgeon']);
  const _removed3 = _myFish3.splice(3, 1);
  const _removed4 = _myFish4.splice(new f.Number(3), new f.Number(1));
  assert.ok(same(_myFish3, _myFish4.value));
  assert.ok(same(_removed3, _removed4.value));

  // Array.prototype.unshift
  const _a3 = [1, 2, 3];
  const _a4 = new f.Array([1, 2, 3]);
  _a3.unshift(4, 5);
  _a4.unshift(new f.Number(4), new f.Number(5));
  assert.ok(same(_a3, _a4.value));

  // Array.prototype.concat
  const _arr11 = ['a', 'b', 'c'];
  const _arr12 = ['d', 'e', 'f'];
  const _arr13 = _arr11.concat(_arr12);
  const _arr21 = new f.Array(['a', 'b', 'c']);
  const _arr22 = new f.Array(['d', 'e', 'f']);
  const _arr23 = _arr21.concat(_arr22);
  assert.ok(same(_arr13, _arr23.value));
  const _arr31 = new f.Array(['a', 'b', 'c'], f.String);
  const _arr32 = new f.Array([1, 2, 3], f.Number);
  assert.throws(() => _arr31.concat(_arr32));
  const _nums11 = [1, 2, 3];
  const _nums12 = [4, 5, 6];
  const _nums13 = [7, 8, 9];
  const _nums14 = _nums11.concat(_nums12, _nums13);
  const _nums21 = new f.Array([1, 2, 3]);
  const _nums22 = new f.Array([4, 5, 6]);
  const _nums23 = new f.Array([7, 8, 9]);
  const _nums24 = _nums21.concat(_nums22, _nums23);
  assert.ok(same(_nums14, _nums24.value));

  // Array.prototype.includes
  const _a5 = [1, 2, 3];
  const _a6 = new f.Array([1, 2, 3]);
  assert.equal(_a5.includes(2), _a6.includes(new f.Number(2)).value);
  assert.equal(_a5.includes(4), _a6.includes(new f.Number(4)).value);
  const _arr1 = ['a', 'b', 'c'];
  const _arr2 = new f.Array(['a', 'b', 'c']);
  assert.equal(_arr1.includes('c', 3), _arr2.includes(new f.String('c'), new f.Number(3)).value);
  assert.equal(_arr1.includes('c', 100), _arr2.includes(new f.String('c'), new f.Number(100)).value);
  assert.equal(_arr1.includes('a', -100), _arr2.includes(new f.String('a'), new f.Number(-100)).value);

  // Array.prototype.indexOf
  const _a7 = [2, 9, 9];
  const _a8 = new f.Array([2, 9, 9]);
  assert.equal(_a7.indexOf(2), _a8.indexOf(new f.Number(2)).value);
  assert.equal(_a7.indexOf(7), _a8.indexOf(new f.Number(7)).value);

  // Array.prototype.join
  const _a9 = ['Wind', 'Rain', 'Fire'];
  const _a10 = new f.Array([new f.String('Wind'), new f.String('Rain'), new f.String('Fire')], f.String);
  assert.equal(_a9.join(), _a10.join().value);
  assert.equal(_a9.join('-'), _a10.join(new f.String('-')).value);
  assert.equal(_a9.join(' + '), _a10.join(new f.String(' + ')).value);

  // Array.prototype.lastIndexOf
  const _numbers3 = [2, 5, 9, 2];
  const _numbers4 = new f.Array([2, 5, 9, 2]);
  assert.equal(_numbers3.lastIndexOf(2), _numbers4.lastIndexOf(new f.Number(2)).value);
  assert.equal(_numbers3.lastIndexOf(7), _numbers4.lastIndexOf(new f.Number(7)).value);
  assert.equal(_numbers3.lastIndexOf(2, 3), _numbers4.lastIndexOf(new f.Number(2), new f.Number(3)).value);
  assert.equal(_numbers3.lastIndexOf(2, 2), _numbers4.lastIndexOf(new f.Number(2), new f.Number(2)).value);

  // Array.prototype.slice
  const _fruits1 = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
  const _fruits2 = new f.Array(['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']);
  const _fruits3 = _fruits1.slice(1, 3);
  const _fruits4 = _fruits2.slice(new f.Number(1), new f.Number(3));
  assert.ok(same(_fruits1, _fruits2.value));
  assert.ok(same(_fruits3, _fruits4.value));

  // Array.prototype.toString
  const _months1 = ['Jan', 'Feb', 'Mar', 'Apr'];
  const _months2 = new f.Array(['Jan', 'Feb', 'Mar', 'Apr']);
  assert.equal(_months1.toString(), _months2.toString().value);

  // Array.prototype.toLocaleString
  const _prices1 = ['￥7', 500, 8123, 12];
  const _prices2 = new f.Array(['￥7', 500, 8123, 12]);
  assert.equal(
    _prices1.toLocaleString('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }),
    _prices2.toLocaleString(new f.String('ja-JP'), new f.Object({
      style: new f.String('currency'),
      currency: new f.String('JPY'),
    })).value);
});

QUnit.test('Boolean', (assert) => {
  assert.equal(false.toString(), new f.Boolean(false).toString().value);
  assert.equal(true.toString(), new f.Boolean(true).toString().value);
  assert.equal(false.valueOf(), new f.Boolean(false).valueOf());
  assert.equal(true.valueOf(), new f.Boolean(true).valueOf());
});

/* QUnit.test('Date', (assert) => {
  // Constructing
  const _date1 = new Date();
  const _date2 = new f.Date();
  assert.equal(_date1.toDateString(), _date2.toDateString().value);
  const _date3 = new Date('December 17, 1995 03:24:00');
  const _date4 = new f.Date(new f.String('December 17, 1995 03:24:00'));
  assert.equal(_date3.toDateString(), _date4.toDateString().value);
  const _date5 = new Date(1995, 11, 17);
  const _date6 = new f.Date(new f.Number(1995), new f.Number(11), new f.Number(17));
  assert.equal(_date5.toDateString(), _date6.toDateString().value);

  assert.equal(Date.now(), f.Date.now().value);
  assert.equal(Date.parse('Aug 9, 1995'), f.Date.parse(new f.String('Aug 9, 1995')).value);
  assert.equal(Date.parse('Wed, 09 Aug 1995 00:00:00 GMT'), f.Date.parse(new f.String('Wed, 09 Aug 1995 00:00:00 GMT')).value);
  assert.equal(Date.UTC(96, 11, 1, 0, 0, 0), f.Date.UTC(new f.Number(96), new f.Number(11), new f.Number(1), new f.Number(0), new f.Number(0), new f.Number(0)).value);

  // Various getter methods
  assert.equal(new Date().getDate(), new f.Date().getDate().value);
  assert.equal(new Date().getDay(), new f.Date().getDay().value);
  assert.equal(new Date().getFullYear(), new f.Date().getFullYear().value);
  assert.equal(new Date().getHours(), new f.Date().getHours().value);
  assert.equal(new Date().getMilliseconds(), new f.Date().getMilliseconds().value);
  assert.equal(new Date().getMinutes(), new f.Date().getMinutes().value);
  assert.equal(new Date().getMonth(), new f.Date().getMonth().value);
  assert.equal(new Date().getSeconds(), new f.Date().getSeconds().value);
  assert.equal(new Date().getTimezoneOffset(), new f.Date().getTimezoneOffset().value);
  assert.equal(new Date().getUTCDate(), new f.Date().getUTCDate().value);
  assert.equal(new Date().getUTCDay(), new f.Date().getUTCDay().value);
  assert.equal(new Date().getUTCFullYear(), new f.Date().getUTCFullYear().value);
  assert.equal(new Date().getUTCHours(), new f.Date().getUTCHours().value);
  assert.equal(new Date().getUTCMilliseconds(), new f.Date().getUTCMilliseconds().value);
  assert.equal(new Date().getUTCMinutes(), new f.Date().getUTCMinutes().value);
  assert.equal(new Date().getUTCMonth(), new f.Date().getUTCMonth().value);
  assert.equal(new Date().getUTCSeconds(), new f.Date().getUTCSeconds().value);
  assert.equal(new Date().getYear(), new f.Date().getYear().value);

  // Various setter methods

}); */
