import isFunction from 'lodash/isFunction';
import Simple from '../simple';
import s from '../simplify';

class _Function extends Simple {
  constructor(defaultValue = () => {}) {
    super(defaultValue, 'Function', isFunction, Function);
  }
  apply(args) {
    return this._value(...s(args));
  }
  call(...args) {
    return this.apply(args);
  }
}

export default _Function;
