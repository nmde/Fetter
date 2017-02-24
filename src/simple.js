import Class from './class';

export default class Simple extends Class {
  constructor(defaultValue, typeName, checker) {
    super(defaultValue, typeName, {
      checker,
    });
  }
  check(newValue) {
    return this.extra.checker(newValue);
  }
}
