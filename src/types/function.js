import isFunction from 'lodash/isFunction';
import Simple from '../simple';
import s from '../simplify';

class _Function extends Simple {
  constructor(defaultValue = () => {}) {
    super(s(defaultValue), 'Function', newValue => isFunction(s(newValue)), Function);
  }
  apply(args) {
    return this._value(...s(args));
  }
  bind(thisArg, ...args) {
    // Bind cannot be defined with autoDefine
    return new _Function(this._value.bind(thisArg, args));
  }
  call(...args) {
    return this.apply(args);
  }
}

export default _Function;
