import Class from '../class';
import s from '../simplify';

export default class Any extends Class {
  constructor(defaultValue) {
    super(s(defaultValue), 'Any');
  }
}
