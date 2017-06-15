import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import Class from '../class';
import s from '../simplify';
import autoDefine from '../autoDefine';
import _Any from './any';
import _Function from './function';
import _Array from './array';
import _Boolean from './boolean';
import _String from './string';

class _Object extends Class {
  constructor(defaultValue = {}) {
    super(s(defaultValue, false), 'Object', {}, Object);
  }
  check(value) {
    return isPlainObject(s(JSON.parse(JSON.stringify(value))));
  }
  get(key) {
    if (key) {
      return this._value[s(key)];
    }
    return this._value;
  }
  set(arg1, arg2) {
    const _arg1 = s(arg1, false);
    if (arg2) {
      let newVal;
      if (isFunction(s(arg2))) {
        newVal = new _Function(s(arg2)).bind(this);
      } else if (arg2.fetter) {
        newVal = arg2;
      } else {
        newVal = new _Any(arg2);
      }
      if (typeof this._value[_arg1] === 'undefined') {
        this._value[_arg1] = newVal;
      } else {
        this._value[_arg1].set(newVal);
      }
    } else if (this.check(_arg1)) {
      this.setValue({});
      const keys = Object.getOwnPropertyNames(_arg1);
      for (let i = 0; i < keys.length; i += 1) {
        this.set(keys[i], _arg1[keys[i]]);
      }
    } else {
      throw new Error('Value is not of type Object');
    }
  }
  static assign(target, ...sources) {
    return new _Object(
      Object.assign.apply(this, [s(target)].concat(sources.map(source => s(source)))));
  }
  static defineProperty(obj, prop, descriptor) {
    // @TODO: All properties must be writable when creating objects
    const _descriptor = s(descriptor);
    _descriptor.writable = true;
    return new _Object(Object.defineProperty(s(obj), s(prop), _descriptor));
  }
  static defineProperties(obj, props) {
    // @TODO: See above
    const _props = s(props);
    const keys = Object.getOwnPropertyNames(_props);
    for (let i = 0; i < keys.length; i += 1) {
      _props[keys[i]].writable = true;
    }
    return new _Object(Object.defineProperties(s(obj), _props));
  }
  static getPrototypeOf() {
    // @TODO: Should this be supported?
    throw new Error('Object.getPrototypeOf is not currently supported by Fetter.');
  }
  static is(value1, value2) {
    // @TODO: Use Fetter.equal
    return new _Boolean(Object.is(s(value1), s(value2)));
  }
  static isFrozen(obj) {
    // isFrozen cannot use f.s, because if it is frozen f.s will cause an error
    if (obj.fetter) {
      return new _Boolean(Object.isFrozen(obj.value));
    }
    return new _Boolean(Object.isFrozen(obj));
  }
  static setPrototypeOf() {
    // @TODO: Should this be supported?
    throw new Error('Object.setPrototypeOf is not currently supported by Fetter.');
  }
  hasOwnProperty(prop) {
    return new _Boolean(Object.prototype.hasOwnProperty.call(this._value, s(prop)));
  }
  isPrototypeOf() {
    // @TODO
    throw new Error('Object.isPrototypeOf is not currently supported by Fetter');
  }
  toLocaleString() {
    return new _String(this._value.toLocaleString());
  }
  toString() {
    return new _String(this._value.toString());
  }
  valueOf() {
    return this.value;
  }
  watch(prop, handler) {
    // Watch uses Fetter's built-in watching system
    this._value[s(prop)].watch(s(handler));
  }
  unwatch(prop) {
    this._value[s(prop)].unwatch();
  }
}

autoDefine(_Object, {
  create: _Object,
  entries: _Array,
  freeze: _Object,
  getOwnPropertyDescriptor: _Object,
  getOwnPropertyDescriptors: _Object,
  getOwnPropertyNames: _Array,
  getOwnPropertySymbols: _Array,
  isExtensible: _Boolean,
  isSealed: _Boolean,
  keys: _Array,
  preventExtensions: _Object,
  seal: _Object,
  values: _Array,
}, Object);

export default _Object;
