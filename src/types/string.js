import isString from 'lodash/isString';
import Simple from '../simple';
import s from '../simplify';

export default class _String extends Simple {
  constructor(defaultValue = '') {
    super(s(defaultValue), 'String', newValue => isString(s(newValue)));
  }
}
