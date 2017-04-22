import Simple from '../simple';
import _String from './string';

class _Boolean extends Simple {
  constructor(defaultValue = false) {
    super(defaultValue, 'Boolean', () => true, Boolean);
  }
  set(newValue) {
    this._value = Boolean(newValue);
    return this._value;
  }
  toString() {
    if (this._value === true) {
      return new _String(`${this._value}`);
    }
    return new _String('false');
  }
}

export default _Boolean;
