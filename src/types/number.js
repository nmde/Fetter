import isNumber from 'lodash/isNumber';
import Simple from '../simple';

export default class Number extends Simple {
  constructor(defaultValue) {
    super(defaultValue, 'Number', isNumber);
  }
}
