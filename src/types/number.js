import isNumber from 'lodash/isNumber';
import Simple from '../simple';
import s from '../simplify';

export default class _Number extends Simple {
  constructor(defaultValue = 0) {
    super(s(defaultValue), 'Number', newValue => isNumber(s(newValue)));
  }
}
