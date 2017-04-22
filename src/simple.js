import Class from './class';

export default class Simple extends Class {
  constructor(defaultValue, typeName, checker, inherits) {
    super(defaultValue, typeName, {
      checker,
    });
    if (inherits) {
      const properties = Object.getOwnPropertyNames(inherits.prototype);
      for (let i = 0; i < properties.length; i += 1) {
        this[properties[i]] = (...args) => this._value[properties[i]](args);
      }
    }
  }
  check(newValue) {
    return this.extra.checker(newValue) || (newValue && newValue.value && this.extra.checker(newValue.value));
  }
}
