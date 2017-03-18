import isFunction from 'lodash/isFunction';
import Simple from '../simple';

export default class _Function extends Simple {
  constructor(defaultValue = () => {}) {
    super(defaultValue, 'Function', isFunction);
  }
  call(...args) {
    return this._value.call(this, args);
  }
}
