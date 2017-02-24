import isBoolean from 'lodash/isBoolean';
import Simple from '../simple';

export default class _Boolean extends Simple {
  constructor(defaultValue = false) {
    super(defaultValue, 'Boolean', isBoolean);
  }
}
