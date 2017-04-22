import Class from './class';

export default class Simple extends Class {
  constructor(defaultValue, typeName, checker, parent) {
    super(defaultValue, typeName, {
      checker,
    }, parent);
  }
  check(newValue) {
    return this.extra.checker(newValue)
      || (newValue && newValue.value && this.extra.checker(newValue.value));
  }
}
