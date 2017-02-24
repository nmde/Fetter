export default class Class {
  constructor(defaultValue, typeName = 'Class', extra = {}) {
    this.typeName = typeName;
    this.extra = extra;
    this.set(defaultValue);
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
