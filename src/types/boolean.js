import isBoolean from 'lodash/isBoolean';
import Simple from '../simple';
import s from '../simplify';
import _String from './string';

class _Boolean extends Simple {
  constructor(defaultValue = false) {
    super(s(defaultValue), 'Boolean', () => true, Boolean);
  }
  static strictCheck(newValue) {
    return isBoolean(s(newValue));
  }
  set(newValue) {
    this.setValue(Boolean(newValue));
    return this._value;
  }
  toString() {
    return new _String(`${this._value}`);
  }
  valueOf() {
    return this._value;
  }
}

export default _Boolean;
