import isArrayLikeObject from 'lodash/isArrayLikeObject';
import Class from '../class';

export default class _Array extends Class {
  constructor(defaultValue = [], innerType) {
    super(defaultValue, `Array<${innerType.typeName}>`, {
      innerType,
    });
  }
  get(index) {
    return this._value[index];
  }
  check(newValues) {
    if (isArrayLikeObject(newValues)) {
      let valid = true;
      for (let i = 0; i < newValues.length; i += 1) {
        if (!this.extra.innerType.check(newValues[i])) {
          valid = false;
        }
      }
      return valid;
    }
    return false;
  }
}
