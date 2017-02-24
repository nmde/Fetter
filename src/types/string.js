import isString from 'lodash/isString';
import Simple from '../simple';

export default class String extends Simple {
  constructor(defaultValue = '') {
    super(defaultValue, 'String', isString);
  }
}
