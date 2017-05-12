import isArrayLikeObject from 'lodash/isArrayLikeObject';
import isNumber from 'lodash/isNumber';
import Class from '../class';
import s from '../simplify';
import convert from '../convert';
import Any from './any';
import _Boolean from './boolean';
import _Number from './number';
import _String from './string';

class _Array extends Class {
  constructor(defaultValue = [], Subtype = Any) {
    super(defaultValue, 'Array', {
      subtype: new Subtype(),
      SubtypeConstructor: Subtype,
      makeError(from, ...args) {
        let str = '';
        for (let i = 0; i < args.length; i += 1) {
          str += `${JSON.stringify(args[i])},`;
        }
        str = str.replace(/,$/, '');
        return new Error(`Value ${str} is not of type Array or ${this.subtype.typeName} (In f.Array.${from})`);
      },
    }, Array);
  }
  check(newValue) {
    const value = s(newValue);
    if (isArrayLikeObject(value)) {
      for (let i = 0; i < value.length; i += 1) {
        if (!this.extra.subtype.check(value[i])) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }
  get(index) {
    if (isNumber(index)) {
      return this._value[index];
    }
    return this._value;
  }
  set(newValue) {
    const value = s(newValue);
    if (!newValue) {
      this._value = [];
    } else if (this.check(value)) {
      this._value = value.map(item => convert(item, this.extra.SubtypeConstructor));
    } else if (isNumber(value)) {
      this._value = new Array(value);
    } else {
      throw this.extra.makeError('set', newValue);
    }
  }
  get length() {
    return new _Number(this._value.length);
  }
  copyWithin(target, start, end) {
    return new _Array(this._value.copyWithin(s(target), s(start), s(end)));
  }
  fill(value, start, end) {
    if (this.extra.subtype.check(value)) {
      return new _Array(
        this._value.fill(convert(value, this.extra.SubtypeConstructor), s(start), s(end)));
    }
    throw this.extra.makeError('fill', value, start, end);
  }
  push(...elements) {
    if (this.check(elements)) {
      let re;
      for (let i = 0; i < elements.length; i += 1) {
        re = this._value.push(convert(elements[i], this.extra.SubtypeConstructor));
      }
      return re;
    }
    throw this.extra.makeError('push', elements);
  }
  sort(compareFunction = (a, b) => {
    if (String(a) < String(b)) {
      return -1;
    } else if (a === b) {
      return 0;
    }
    return 1;
  }) {
    this._value = this._value.sort((a, b) => compareFunction(s(a), s(b)));
    return this._value;
  }
  splice(start, deleteCount, ...items) {
    const _start = s(start);
    const _deleteCount = s(deleteCount);
    const _items = items.map(item => convert(item, this.extra.SubtypeConstructor));
    if (_items.length > 0) {
      if (this.check(_items)) {
        const re = new _Array();
        for (let i = 0; i < _deleteCount; i += 1) {
          re.push(this._value.splice(_start, 1)[0]);
        }
        const rev = _items.reverse();
        for (let i = 0; i < rev.length; i += 1) {
          this._value.splice(_start, 0, rev[i]);
        }
        return re;
      }
      throw this.makeError('splice', _start, _deleteCount, _items);
    }
    return new _Array(this._value.splice(_start, _deleteCount), this.extra.SubtypeConstructor);
  }
  unshift(...elements) {
    const _elements = elements.map(element => convert(element, this.extra.SubtypeConstructor));
    if (_elements.length === 0) {
      return new _Array(this._value.unshift());
    } else if (this.check(_elements)) {
      const rev = _elements.reverse();
      for (let i = 0; i < rev.length; i += 1) {
        this._value.unshift(rev[i]);
      }
      return new _Number(this._value.length);
    }
    throw this.extra.makeError('unshift', _elements);
  }
  concat(...elements) {
    const re = new _Array(this._value, this.extra.SubtypeConstructor);
    for (let i = 0; i < elements.length; i += 1) {
      if (this.check(elements[i])) {
        re.value = re.value.concat(s(elements[i]));
      } else {
        throw this.extra.makeError('concat', elements);
      }
    }
    return re;
  }
  includes(searchElement, fromIndex = 0) {
    // Cannot rely on the environment as Array.prototype.includes is not yet standard
    const _searchElement = convert(searchElement, this.extra.SubtypeConstructor);
    const _fromIndex = s(fromIndex);
    for (let i = _fromIndex; i < this.length.value; i += 1) {
      if (s(this.get(i)) === s(_searchElement)) {
        return new _Boolean(true);
      }
    }
    return new _Boolean(false);
  }
  indexOf(searchElement, fromIndex = 0) {
    return new _Number(this._value.map(item => s(item)).indexOf(s(searchElement), s(fromIndex)));
  }
  join(separator = ',') {
    return new _String(this._value.map(item => s(item)).join(s(separator)));
  }
  lastIndexOf(searchElement, fromIndex = this.length.value) {
    return new _Number(
      this._value.map(item => s(item)).lastIndexOf(s(searchElement), s(fromIndex)));
  }
  slice(begin, end) {
    return new _Array(this._value.slice(s(begin), s(end)));
  }
  toString() {
    return new _String(this._value.map(item => s(item)).toString());
  }
  toLocaleString(locales, options) {
    return new _String(this._value.map(item => s(item)).toLocaleString(s(locales), s(options)));
  }
}

_Array.from = (arrayLike, mapFn, thisArg) =>
  new _Array(Array.from(s(arrayLike), s(mapFn), s(thisArg)));

_Array.isArray = obj => new _Boolean(Array.isArray(s(obj)));

_Array.of = (...elements) => new _Array(elements);

export default _Array;
