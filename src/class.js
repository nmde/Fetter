import isFunction from 'lodash/isFunction';
import s from './simplify';
import autoDefine from './autoDefine';

export default class Class {
  constructor(defaultValue, typeName = 'Class', extra = {}, parent, auto) {
    this.typeName = typeName;
    this.extra = extra;
    this.fetter = true;
    this.watchers = [];
    this.set(defaultValue);
    if (auto) {
      autoDefine(this, auto, parent.prototype);
    }
    if (parent) {
      const inherits = Object.getOwnPropertyNames(parent.prototype);
      for (let i = 0; i < inherits.length; i += 1) {
        if (inherits[i] !== 'arguments' && inherits[i] !== 'caller' && !this[inherits[i]] && isFunction(parent.prototype[inherits[i]])) {
          this[inherits[i]] = (...args) => this._value[inherits[i]](args.map(arg => s(arg)));
        }
      }
    }
  }
  get value() {
    return this.get();
  }
  set value(newValue) {
    this.set(newValue);
  }
  check() {
    return true;
  }
  static strictCheck() {
    return this.check();
  }
  get() {
    return this._value;
  }
  setValue(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    for (let i = 0; i < this.watchers.length; i += 1) {
      this.watchers[i](oldValue, newValue);
    }
  }
  set(newValue) {
    if (this.check(newValue)) {
      this.setValue(s(newValue));
    } else {
      throw new Error(`Value is not of type ${this.typeName}`);
    }
  }
  watch(callback) {
    this.watchers.push(s(callback));
  }
  unwatch() {
    this.watchers = this.watchers.splice(1);
  }
}
