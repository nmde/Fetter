import isNumber from 'lodash/isNumber';
import Simple from '../simple';

export default class _Number extends Simple {
  constructor(defaultValue = 0) {
    super(defaultValue, 'Number', isNumber);
  }
}
