import isObject from 'lodash/isObject';
import Class from '../class';
import Any from './any';
import s from '../simplify';

class _Object extends Class {
  constructor(defaultValue = {}, Subtype = Any) {
    super(s(defaultValue), 'Object', {
      subtype: new Subtype(),
      SubtypeConstructor: Subtype,
    }, Object);
  }
  check(newValue) {
    return isObject(newValue);
  }
  get(key) {
    if (typeof key !== 'undefined') {
      if (key.fetter) {
        return this._value[key.value];
      }
      return this._value[key];
    }
    return this._value;
  }
  set(arg1, arg2) {
    let key = arg1;
    if (arg1.fetter) {
      key = arg1.value;
    }
    if (arg2 && this.extra.subtype.check(arg2)) {
      this._value[key] = new this.extra.SubtypeConstructor(arg2);
    } else if (arg2) {
      throw new Error(`Value is not of type ${this.extra.subtype.typeName}`);
    } else if (this.check(arg1)) {
      this._value = arg1;
    } else {
      throw new Error('Value is not of type Object');
    }
  }
}

export default _Object;
