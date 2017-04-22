import isArrayLikeObject from 'lodash/isArrayLikeObject';
import isNumber from 'lodash/isNumber';
import Class from '../class';
import Any from './any';

class _Array extends Class {
  constructor(defaultValue = [], Subtype = Any) {
    super(defaultValue, 'Array', {
      subtype: new Subtype(),
      SubtypeConstructor: Subtype,
    }, Array);
  }
  check(newValue) {
    let arr;
    if (isArrayLikeObject(newValue) && !newValue.fetter) {
      arr = newValue;
    } else if (isArrayLikeObject(newValue.value) && newValue.fetter) {
      arr = newValue.value;
    } else {
      return false;
    }
    for (let i = 0; i < arr.length; i += 1) {
      if (!this.extra.subtype.check(arr[i])) {
        return false;
      }
    }
    return true;
  }
  get(index) {
    if (isNumber(index)) {
      return this._value[index];
    }
    return this._value;
  }
  convert(value) {
    if (!value.fetter) {
      return new this.extra.SubtypeConstructor(value);
    }
    return value;
  }
  makeError(from, ...args) {
    let str = '';
    for (let i = 0; i < args.length; i += 1) {
      str += `${JSON.stringify(args[i])},`;
    }
    str = str.replace(/,$/, '');
    return new Error(`Value ${str} is not of type Array or ${this.extra.subtype.typeName} (In f.Array.${from})`);
  }
  set(newValue) {
    if (!newValue) {
      this._value = [];
    } else if (newValue.fetter) {
      this._value = newValue.value;
    } else if (this.check(newValue)) {
      this._value = newValue.map(item => this.convert(item));
    } else if (isNumber(newValue)) {
      this._value = new Array(newValue);
    } else {
      throw this.makeError('set', newValue);
    }
    return this._value;
  }
  get length() {
    return this._value.length;
  }
  fill(value, start, end) {
    if (this.extra.subtype.check(value)) {
      return this._value.fill(this.convert(value), start, end);
    }
    throw this.makeError('fill', value, start, end);
  }
  push(...elements) {
    if (this.check(elements)) {
      let re;
      for (let i = 0; i < elements.length; i += 1) {
        re = this._value.push(this.convert(elements[i]));
      }
      return re;
    }
    throw this.makeError('push', elements);
  }
  splice(start, deleteCount, ...items) {
    if (items.length > 0) {
      if (this.check(items)) {
        const re = [];
        for (let i = 0; i < deleteCount; i += 1) {
          re.push(this._value.splice(start, 1)[0]);
        }
        const rev = items.reverse();
        for (let i = 0; i < rev.length; i += 1) {
          this._value.splice(start, 0, this.convert(rev[i]));
        }
        return re;
      }
      throw this.makeError('splice', start, deleteCount, items);
    }
    return this._value.splice(start, deleteCount);
  }
  unshift(...elements) {
    if (elements.length === 0) {
      return this._value.unshift();
    } else if (this.check(elements)) {
      const rev = elements.reverse();
      for (let i = 0; i < rev.length; i += 1) {
        this._value.unshift(this.convert(rev[i]));
      }
      return this._value.length;
    }
    throw this.makeError('unshift', elements);
  }
  concat(...elements) {
    const re = new _Array(this._value, this.extra.SubtypeConstructor);
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].fetter && this.check(elements[i])) {
        re.value = re.value.concat(elements[i].value);
      } else if (this.check(elements[i])) {
        re.value = re.value.concat(elements[i]);
      } else {
        throw this.makeError('concat', elements);
      }
    }
    return re;
  }
}

_Array.from = Array.from;
_Array.isArray = Array.isArray;
_Array.of = Array.of;

export default _Array;
