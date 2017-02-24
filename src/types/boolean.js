import isBoolean from 'lodash/isBoolean';
import Simple from '../simple';

export default class Boolean extends Simple {
  constructor(defaultValue) {
    super(defaultValue, 'Boolean', isBoolean);
  }
}
