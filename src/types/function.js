import isFunction from 'lodash/isFunction';
import Simple from '../simple';

export default class _Function extends Simple {
  constructor(defaultValue = () => {}) {
    super(defaultValue, 'Function', isFunction);
  }
}
