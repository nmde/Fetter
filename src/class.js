import isFunction from 'lodash/isFunction';

export default class Class {
  constructor(defaultValue, typeName = 'Class', extra = {}, parent) {
    this.typeName = typeName;
    this.extra = extra;
    this.fetter = true;
    this.set(defaultValue);
    if (parent) {
      const inherits = Object.getOwnPropertyNames(parent.prototype);
      for (let i = 0; i < inherits.length; i += 1) {
        if (!this[inherits[i]] && isFunction(parent.prototype[inherits[i]])) {
          this[inherits[i]] = (...args) => this._value[inherits[i]](args);
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
  get() {
    return this._value;
  }
  set(newValue) {
    if (this.check(newValue)) {
      this._value = newValue;
    } else {
      throw new Error(`Value is not of type ${this.typeName}`);
    }
  }
}
