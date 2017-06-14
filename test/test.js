/* eslint max-len: ["off"] */
/* eslint no-new-wrappers: ["off"] */
const f = require('../dist/fetter');
const QUnit = require('qunitjs');
require('./includes');

function sameObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(f.s(obj2));
}

function sameArray(array1, array2) {
  const _array2 = f.s(array2);
  let result = array1.length === _array2.length;
  if (result) {
    for (let i = 0; i < array1.length; i += 1) {
      result = result && array1[i].toString() === _array2[i].toString();
    }
  }
  return result;
}

QUnit.test('Array', (assert) => {
  function a(...args) {
    return Array.from(args);
  }
  function b(...args) {
    return f.Array.from(args);
  }

  // Array.from
  assert.ok(sameArray(Array.from(['a', 'b', 'c']), f.Array.from(['a', 'b', 'c']).value));
  assert.ok(sameArray(Array.from(['a', 'b', 'c']), f.Array.from(new f.Array([new f.String('a'), new f.String('b'), new f.String('c')], f.String)).value));
  assert.ok(sameArray(Array.from('foo'), f.Array.from('foo').value));
  assert.ok(sameArray(Array.from('foo'), f.Array.from(new f.String('foo')).value));
  assert.ok(sameArray(Array.from(new Set(['foo', this])), f.Array.from(new Set(['foo', this])).value));
  assert.ok(sameArray(Array.from(new Set(['foo', this])), f.Array.from(new Set([new f.String('foo'), this])).value));

  // @TODO: f.Map
  // assert.ok(sameArray(Array.from(new Map([1, 2], [2, 4], [4, 8])), f.Array.from(new Map([1, 2], [2, 4], [4, 8])).value));
  // assert.ok(sameArray(Array.from(new Map([1, 2], [2, 4], [4, 8])), f.Array.from(new Map(new f.Array([new f.Number(1), new f.Number(2)], f.Number), new f.Array([new f.Number(2), new f.Number(4)], f.Number), new f.Array([new f.Number(4), new f.Number(8)], f.Number))).value));
  assert.ok(sameArray(Array.from(a()), f.Array.from(a()).value));
  assert.ok(sameArray(Array.from(a()), f.Array.from(b()).value));
  assert.ok(sameArray(Array.from([1, 2, 3], x => x + x), f.Array.from([1, 2, 3], x => x + x).value));
  assert.ok(sameArray(Array.from([1, 2, 3], x => x + x), f.Array.from(new f.Array([new f.Number(1), new f.Number(2), new f.Number(3)], f.Number), new f.Function(x => x + x)).value));

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
  assert.ok(sameArray(Array.of(7), f.Array.of(7).value));
  assert.ok(sameArray(Array.of(7), f.Array.of(new f.Number(7)).value));
  assert.ok(sameArray(Array.of(1, 2, 3), f.Array.of(1, 2, 3).value));
  assert.ok(sameArray(Array.of(1, 2, 3), f.Array.of(new f.Number(1), new f.Number(2), new f.Number(3)).value));

  // Array.prototype.copyWithin
  assert.ok(sameArray(['alpha', 'bravo', 'charlie', 'delta'].copyWithin(2, 0), new f.Array([new f.String('alpha'), new f.String('bravo'), new f.String('charlie'), new f.String('delta')], f.String).copyWithin(2, 0).value));
  assert.ok(sameArray([1, 2, 3, 4, 5].copyWithin(-2), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(-2).value));
  assert.ok(sameArray([1, 2, 3, 4, 5].copyWithin(0, 3), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(0, 3).value));
  assert.ok(sameArray([1, 2, 3, 4, 5].copyWithin(0, 3, 4), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(0, 3, 4).value));
  assert.ok(sameArray([1, 2, 3, 4, 5].copyWithin(-2, -3, -1), new f.Array([1, 2, 3, 4, 5], f.Number).copyWithin(-2, -3, -1).value));

  // Array.prototype.fill
  assert.ok(sameArray([1, 2, 3].fill(1), new f.Array([1, 2, 3], f.Number).fill(new f.Number(1)).value));
  assert.ok(sameArray([1, 2, 3].fill(4, 1), new f.Array([1, 2, 3], f.Number).fill(new f.Number(4), new f.Number(1)).value));
  assert.throws(() => new f.Array([1, 2, 3], f.Number).fill('foo'));
  assert.throws(() => new f.Array([1, 2, 3], f.Number).fill(new f.String('foo')));
  assert.ok(sameArray([1, 2, 3].fill(4, 1, 2), new f.Array([1, 2, 3], f.Number).fill(4, 1, 2).value));
  assert.ok(sameArray([1, 2, 3].fill(4, -3, -2), new f.Array([1, 2, 3], f.Number).fill(4, -3, -2).value));

  // Array.prototype.pop
  const _a1 = [1, 2, 3];
  const _a2 = new f.Array([1, 2, 3]);
  _a1.pop();
  _a2.pop();
  assert.ok(sameArray(_a1, _a2.value));

  // Array.prototype.push
  const _numbers1 = [1, 2, 3];
  const _numbers2 = new f.Array([1, 2, 3], f.Number);
  _numbers1.push(4);
  _numbers2.push(new f.Number(4));
  assert.ok(sameArray(_numbers1, _numbers2.value));
  const _sports1 = ['soccer', 'baseball'];
  const _sports2 = new f.Array(['soccer', 'baseball'], f.String);
  _sports1.push('football', 'swimming');
  _sports2.push('football', 'swimming');
  assert.ok(sameArray(_sports1, _sports2.value));
  const _vegetables1 = ['parsnip', 'potato'];
  const _vegetables2 = new f.Array(['parsnip', 'potato']);
  Array.prototype.push.apply(_vegetables1, ['celery', 'beetroot']);
  f.Array.prototype.push.apply(_vegetables2, new f.Array(['celery', 'beetroot']));

  // Array.prototype.reverse
  const _a = ['one', 'two', 'three'];
  const _b = new f.Array(['one', 'two', 'three']);
  _a.reverse();
  _b.reverse();
  assert.ok(sameArray(_a, _b.value));

  // Array.prototype.shift
  const _c = [1, 2, 3];
  const _d = new f.Array([1, 2, 3]);
  const _e = _c.shift();
  const _f = _d.shift();
  assert.ok(sameArray(_c, _d.value));
  assert.equal(_e, _f.value);

  // Array.prototype.sort
  const _fruit1 = ['cherries', 'apples', 'bananas'];
  const _fruit2 = new f.Array(['cherries', 'apples', 'bananas']);
  _fruit1.sort();
  _fruit2.sort();
  assert.ok(sameArray(_fruit1, _fruit2.value));
  const _scores1 = [1, 10, 21, 2];
  const _scores2 = new f.Array([1, 10, 21, 2]);
  _scores1.sort();
  _scores2.sort();
  assert.ok(sameArray(_scores1, _scores2.value));

  // Array.prototype.splice
  const _myFish1 = ['angel', 'clown', 'mandarin', 'sturgeon'];
  const _myFish2 = new f.Array(['angel', 'clown', 'mandarin', 'sturgeon']);
  const _removed1 = _myFish1.splice(2, 0, 'drum');
  const _removed2 = _myFish2.splice(new f.Number(2), new f.Number(0), new f.String('drum'));
  assert.ok(sameArray(_myFish1, _myFish2.value));
  assert.ok(sameArray(_removed1, _removed2.value));
  const _myFish3 = ['angel', 'clown', 'mandarin', 'sturgeon'];
  const _myFish4 = new f.Array(['angel', 'clown', 'mandarin', 'sturgeon']);
  const _removed3 = _myFish3.splice(3, 1);
  const _removed4 = _myFish4.splice(new f.Number(3), new f.Number(1));
  assert.ok(sameArray(_myFish3, _myFish4.value));
  assert.ok(sameArray(_removed3, _removed4.value));

  // Array.prototype.unshift
  const _a3 = [1, 2, 3];
  const _a4 = new f.Array([1, 2, 3]);
  _a3.unshift(4, 5);
  _a4.unshift(new f.Number(4), new f.Number(5));
  assert.ok(sameArray(_a3, _a4.value));

  // Array.prototype.concat
  const _arr11 = ['a', 'b', 'c'];
  const _arr12 = ['d', 'e', 'f'];
  const _arr13 = _arr11.concat(_arr12);
  const _arr21 = new f.Array(['a', 'b', 'c']);
  const _arr22 = new f.Array(['d', 'e', 'f']);
  const _arr23 = _arr21.concat(_arr22);
  assert.ok(sameArray(_arr13, _arr23.value));
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
  assert.ok(sameArray(_nums14, _nums24.value));

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
  assert.ok(sameArray(_fruits1, _fruits2.value));
  assert.ok(sameArray(_fruits3, _fruits4.value));

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

QUnit.test('Date', (assert) => {
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

  // Getter methods
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

  // Setter methods
  const _theBigDay1 = new Date(1962, 6, 7);
  const _theBigDay2 = new f.Date(new f.Number(1962), new f.Number(6), new f.Number(7));
  _theBigDay1.setDate(24);
  _theBigDay2.setDate(new f.Number(24));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setFullYear(1997);
  _theBigDay2.setFullYear(new f.Number(1997));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setHours(1);
  _theBigDay2.setHours(new f.Number(1));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setMilliseconds(100);
  _theBigDay2.setMilliseconds(new f.Number(100));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setMinutes(45);
  _theBigDay2.setMinutes(new f.Number(45));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setMonth(1);
  _theBigDay2.setMonth(new f.Number(1));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setSeconds(30);
  _theBigDay2.setSeconds(new f.Number(30));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setTime(new Date().getTime());
  _theBigDay2.setTime(new f.Date().getTime());
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCDate(20);
  _theBigDay2.setUTCDate(new f.Number(20));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCFullYear(1998);
  _theBigDay2.setUTCFullYear(new f.Number(1998));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCHours(8);
  _theBigDay2.setUTCHours(new f.Number(8));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCMilliseconds(500);
  _theBigDay2.setUTCMilliseconds(new f.Number(500));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCMinutes(43);
  _theBigDay2.setUTCMinutes(new f.Number(43));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCMonth(11);
  _theBigDay2.setUTCMonth(new f.Number(11));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setUTCSeconds(20);
  _theBigDay2.setUTCSeconds(new f.Number(20));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);
  _theBigDay1.setYear(2000);
  _theBigDay2.setYear(new f.Number(2000));
  assert.equal(_theBigDay1.toDateString(), _theBigDay2.toDateString().value);

  // Conversion methods
  assert.equal(new Date().toDateString(), new f.Date().toDateString().value);
  assert.equal(new Date('05 October 2011 14:48 UTC').toISOString(), new f.Date(new f.String('05 October 2011 14:48 UTC')).toISOString().value);
  assert.equal(new Date().toJSON(), new f.Date().toJSON().value);
  assert.equal(new Date().toGMTString(), new f.Date().toGMTString().value);
  assert.equal(new Date().toLocaleDateString(), new f.Date().toLocaleDateString().value);
  assert.equal(new Date().toLocaleDateString('ko-KR'), new f.Date().toLocaleDateString(new f.String('ko-KR')).value);
  assert.equal(new Date().toLocaleString(), new f.Date().toLocaleString().value);
  assert.equal(new Date().toLocaleString('ar-EG'), new f.Date().toLocaleString(new f.String('ar-EG')).value);
  assert.equal(new Date().toLocaleTimeString(), new f.Date().toLocaleTimeString().value);
  assert.equal(new Date().toLocaleTimeString('ko-KR'), new f.Date().toLocaleTimeString(new f.String('ko-KR')).value);
  assert.equal(new Date().toString(), new f.Date().toString().value);
  assert.equal(new Date().toTimeString(), new f.Date().toTimeString().value);
  assert.equal(new Date().toUTCString(), new f.Date().toUTCString().value);
});

/* QUnit.test('Function', (assert) => {
  assert.equal((() => 5)(), new f.Function(() => new f.Number(5)).call().value);
  assert.equal(((x, y) => x + y)(2, 3), new f.Function((x, y) => new f.Number(f.s(x) + f.s(y))).call(new f.Number(2), new f.Number(3)).value);
  assert.equal(((x, y) => x + y)(2, 3), new f.Function((x, y) => new f.Number(f.s(x) + f.s(y))).apply(new f.Array([new f.Number(2), new f.Number(3)])).value);
  const _obj1 = {
    x: 5,
    getX() {
      return this.x;
    },
    inner: {
      x: 7,
      getX() {
        return this.x;
      },
    },
  };
  const _obj2 = new f.Object({
    x: new f.Number(5),
    getX: new f.Function(function getX() { return this.x; }),
    inner: new f.Object({
      x: new f.Number(7),
      getX: new f.Function(function getX() { return this.x; }),
    }),
  });
  assert.equal(_obj1.getX(), _obj2.get(new f.String('getX')).call().value);
  console.log(_obj2.get('inner'));
  assert.equal(_obj1.inner.getX(), _obj2.get(new f.String('inner')).get(new f.String('getX')).call().value);
}); */

QUnit.test('Object', (assert) => {
  // Basic usage
  assert.ok(sameObject({}, new f.Object({})));
  assert.ok(sameObject({
    a: 'foo',
    b: 42,
    c: {},
  }, new f.Object({
    a: new f.String('foo'),
    b: new f.Number(42),
    c: new f.Object({}),
  })));
  assert.ok(sameObject({
    foo: 'bar',
    age: 42,
    baz: {
      myProp: 12,
    },
  }, new f.Object({
    foo: new f.String('bar'),
    age: new f.Number(42),
    baz: new f.Object({
      myProp: new f.Number(12),
    }),
  })));
  const _obj1 = {
    x: 5,
    getX() {
      return this.x;
    },
  };
  const _obj2 = new f.Object({
    x: new f.Number(5),
    getX: new f.Function(function getX() { return this.get('x'); }),
  });
  assert.equal(_obj1.getX(), _obj2.get('getX').call().value);

  // Object.assign
  const _obj3 = { a: 1 };
  const _obj4 = new f.Object({ a: new f.Number(1) });
  assert.ok(sameObject(Object.assign({}, _obj3), f.Object.assign({}, _obj4)));
  const _obj51 = { a: 1 };
  const _obj52 = { b: 2 };
  const _obj53 = { c: 3 };
  const _obj61 = new f.Object({ a: new f.Number(1) });
  const _obj62 = new f.Object({ b: new f.Number(2) });
  const _obj63 = new f.Object({ c: new f.Number(3) });
  assert.ok(sameObject(Object.assign(_obj51, _obj52, _obj53), f.Object.assign(_obj61, _obj62, _obj63)));
  const _obj71 = { a: 1, b: 1, c: 1 };
  const _obj72 = { c: 3 };
  const _obj81 = new f.Object({ a: new f.Number(1), b: new f.Number(1), c: new f.Number(1) });
  const _obj82 = new f.Object({ c: new f.Number(3) });
  assert.ok(sameObject(Object.assign({}, _obj71, _obj72), f.Object.assign(new f.Object(), _obj81, _obj82)));

  // Object.create
  assert.ok(sameObject(Object.create({}), f.Object.create(new f.Object())));
  const _o1 = Object.create({}, { a: { value: 1 } });
  const _o2 = f.Object.create(new f.Object(), new f.Object({ a: new f.Object({ value: new f.Number(1) }) }));
  assert.ok(sameArray(Object.getOwnPropertyNames(_o1), new f.Array(Object.getOwnPropertyNames(f.s(_o2)))));

  // Object.defineProperty
  const _obj9 = {};
  const _obj10 = new f.Object({});
  Object.defineProperty(_obj9, 'a', { value: 'foo' });
  f.Object.defineProperty(_obj10, new f.String('a'), new f.Object({ value: new f.String('foo') }));
  assert.ok(sameObject(_obj9, _obj10));

  // Object.defineProperties
  const _obj11 = {};
  const _obj12 = new f.Object({});
  Object.defineProperties(_obj11, {
    a: {
      value: 1,
    },
    b: {
      value: 2,
    },
  });
  f.Object.defineProperties(_obj12, new f.Object({
    a: new f.Object({
      value: new f.Number(1),
    }),
    b: new f.Object({
      value: new f.Number(2),
    }),
  }));
  assert.ok(sameObject(_obj11, _obj12));

  // Object.entries
  const _obj13 = { foo: 'bar', baz: 42 };
  const _obj14 = new f.Object({ foo: new f.String('bar'), baz: new f.Number(42) });
  assert.ok(sameArray(Object.entries(_obj13)[0], f.s(f.Object.entries(_obj14).get(0))));
  assert.ok(sameArray(Object.entries(_obj13)[1], f.s(f.Object.entries(_obj14).get(1))));

  // Object.freeze
  const _obj21 = { foo: 'bar' };
  const _obj22 = new f.Object({ foo: new f.String('bar') });
  const _obj23 = Object.freeze(_obj21);
  const _obj24 = f.Object.freeze(_obj22);
  assert.ok(sameObject(_obj23, _obj24));
  assert.throws(() => _obj22.set('foo', 'baz'));

  // Object.getOwnPropertyDescriptor
  const _obj31 = { foo: 'bar' };
  const _obj32 = new f.Object({ foo: new f.String('bar') });
  assert.ok(sameObject(Object.getOwnPropertyDescriptor(_obj31, 'foo'), f.s(f.Object.getOwnPropertyDescriptor(_obj32, new f.String('foo')))));

  // Object.getOwnPropertyDescriptors
  const _obj41 = { foo: 'bar' };
  const _obj42 = new f.Object({ foo: new f.String('bar') });
  assert.ok(sameObject(Object.getOwnPropertyDescriptors(_obj41), f.s(f.Object.getOwnPropertyDescriptors(_obj42))));

  // Object.getOwnPropertyNames
  const _obj91 = { foo: 'bar', bar: 'baz' };
  const _obj92 = new f.Object(_obj91);
  assert.ok(sameArray(Object.getOwnPropertyNames(_obj91), f.s(f.Object.getOwnPropertyNames(_obj92))));

  // Object.getOwnPropertySymbols
  const _obj101 = {};
  const a = Symbol('a');
  _obj101[a] = 'bar';
  const _obj102 = new f.Object();
  // @TODO: f.Symbol
  const b = Symbol('a');
  _obj102.set(b, new f.String('bar'));
  assert.ok(sameArray(Object.getOwnPropertySymbols(_obj101), f.s(f.Object.getOwnPropertySymbols(_obj102))));

  // Object.is
  assert.equal(Object.is('foo', 'foo'), f.Object.is(new f.String('foo'), new f.String('foo')).value);
  assert.equal(Object.is([], []), f.Object.is(new f.Array(), new f.Array()).value);
  const _test1 = { a: 1 };
  const _test2 = new f.Object({ a: new f.Number(1) });
  assert.equal(Object.is(_test1, _test1), f.Object.is(_test2, _test2).value);

  // Object.preventExtensions
  const _obj111 = { foo: 'bar' };
  const _obj112 = new f.Object({ foo: new f.String('bar') });
  const _obj113 = Object.preventExtensions(_obj111);
  const _obj114 = f.Object.preventExtensions(_obj112);
  assert.ok(sameObject(_obj113, _obj114));
  assert.throws(() => _obj112.set('bar', 'baz'));

  // Object.isExtensible
  assert.equal(Object.isExtensible({}), f.Object.isExtensible(new f.Object()).value);
  const _obj121 = { foo: 'bar' };
  Object.preventExtensions(_obj121);
  const _obj122 = new f.Object({ foo: 'bar' });
  f.Object.preventExtensions(_obj122);
  assert.equal(Object.isExtensible(_obj121), f.Object.isExtensible(_obj122).value);

  // Object.isFrozen
  assert.equal(Object.isFrozen({}), f.Object.isFrozen(new f.Object()).value);
  const _obj131 = { foo: 'bar' };
  Object.freeze(_obj131);
  const _obj132 = new f.Object({ foo: 'bar' });
  f.Object.freeze(_obj132);
  assert.equal(Object.isFrozen(_obj131), f.Object.isFrozen(_obj132).value);

  // Object.seal
  const _obj141 = { foo: 'bar' };
  const _obj142 = new f.Object({ foo: new f.String('bar') });
  Object.seal(_obj141);
  f.Object.seal(_obj142);
  assert.throws(() => _obj142.set('bar', 'baz'));

  // Object.isSealed
  assert.equal(Object.isSealed({}), f.Object.isSealed(new f.Object()).value);
  const _obj151 = { foo: 'bar' };
  Object.seal(_obj151);
  const _obj152 = new f.Object({ foo: 'bar' });
  f.Object.seal(_obj152);
  assert.equal(Object.isSealed(_obj151), f.Object.isSealed(_obj152).value);

  // Object.keys
  assert.ok(sameArray(Object.keys({}), f.Object.keys(new f.Object())));
  const _obj161 = { foo: 'bar' };
  const _obj162 = new f.Object({ foo: new f.String('bar') });
  assert.ok(sameArray(Object.keys(_obj161), f.s(f.Object.keys(_obj162))));

  // Object.values
  const _obj171 = { foo: 'bar' };
  const _obj172 = new f.Object({ foo: 'bar' });
  assert.ok(sameArray(Object.values(_obj171), f.s(f.Object.values(_obj172))));

  // Object.prototype.hasOwnProperty
  const _o3 = { prop: 'exists' };
  const _o4 = new f.Object({ prop: new f.String('exists') });
  assert.equal(Object.prototype.hasOwnProperty.call(_o3, 'prop'), f.Object.prototype.hasOwnProperty.call(_o4, new f.String('prop')).value);
  assert.equal(Object.prototype.hasOwnProperty.call(_o3, 'foo'), f.Object.prototype.hasOwnProperty.call(_o4, new f.String('foo')).value);
});
