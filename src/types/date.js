import isDate from 'lodash/isDate';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import Class from '../class';
import s from '../simplify';

class _Date extends Class {
  constructor(
    defaultValue = new Date(),
    month = 0,
    day = 1,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0) {
    super(s(defaultValue), 'Date', {
      month: s(month),
      day: s(day),
      hours: s(hours),
      minutes: s(minutes),
      seconds: s(seconds),
      milliseconds: s(milliseconds),
    }, Date);
  }
  check(newValue) {
    return isDate(s(newValue));
  }
  set(newValue, ...extra) {
    if (this.check(newValue)) {
      this._value = newValue;
    } else if (isString(newValue)) {
      this._value = new Date(newValue);
    } else if (extra.length > 0) {
      this._value = new Date(newValue, extra);
    } else if (isNumber(this.extra.month)) {
      this._value = new Date(
        newValue,
        this.extra.month,
        this.extra.day,
        this.extra.hours,
        this.extra.minutes,
        this.extra.seconds,
        this.extra.milliseconds);
      this.extra = {};
    } else {
      throw new Error(`Value is not of type ${this.typeName} or String`);
    }
  }
}

_Date.now = Date.now;
_Date.parse = Date.parse;
_Date.UTC = Date.UTC;

export default _Date;
